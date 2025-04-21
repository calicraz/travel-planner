require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers
app.use(helmet());

// Rate limiting for form submissions (max 10 per hour per IP)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many form submissions from this IP, please try again after an hour'
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Serve static files from the React app build folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Email configuration using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // For local development only, remove in production
  }
});

// Handle form submissions with rate limiting
app.post('/api/submit-form', formLimiter, async (req, res) => {
  try {
    // Input validation
    const formData = req.body;
    
    if (!formData.name || !formData.email || !formData.from || !formData.to || !formData.departureDate) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    
    // Prepare email content with sanitized data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Travel Booking Request',
      html: `
        <h2>New Travel Booking Request</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>WhatsApp:</strong> ${formData.whatsapp || 'Not provided'}</p>
        <p><strong>From:</strong> ${formData.from}</p>
        <p><strong>To:</strong> ${formData.to}</p>
        <p><strong>Trip Type:</strong> ${formData.tripType === 'round' ? 'Round Trip' : 'One Way'}</p>
        <p><strong>Departure Date:</strong> ${formData.departureDate}</p>
        ${formData.tripType === 'round' ? `<p><strong>Return Date:</strong> ${formData.returnDate}</p>` : ''}
        <p><strong>Cabin Class:</strong> ${formData.cabinClass}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation to user
    const userConfirmation = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Your Travel Booking Request Received',
      html: `
        <div style="font-family: Arial, sans-serif; color: #22333B; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #22333B; padding: 20px; text-align: center; color: #EAE0D5;">
            <h1 style="margin: 0;">✨ Travel Request Received! ✨</h1>
          </div>
          <div style="padding: 20px; border: 2px solid #C6AC8E; border-top: none;">
            <p>Hi ${formData.name},</p>
            <p>Thank you for submitting your travel request! We've received your information and are on the hunt for the best deals for your trip.</p>
            
            <div style="background-color: #EAE0D5; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #22333B;">Your Trip Details:</h3>
              <p><strong>From:</strong> ${formData.from}</p>
              <p><strong>To:</strong> ${formData.to}</p>
              <p><strong>Trip Type:</strong> ${formData.tripType === 'round' ? 'Round Trip' : 'One Way'}</p>
              <p><strong>Departure Date:</strong> ${formData.departureDate}</p>
              ${formData.tripType === 'round' ? `<p><strong>Return Date:</strong> ${formData.returnDate}</p>` : ''}
              <p><strong>Cabin Class:</strong> ${formData.cabinClass}</p>
            </div>
            
            <p>Our team will get back to you within 48 hours if we can secure a better rate for your journey.</p>
            <p>If you have any questions in the meantime, feel free to reply to this email.</p>
            
            <p>Safe travels!</p>
            <p style="color: #C6AC8E; font-weight: bold;">The Travel Vibes Team</p>
          </div>
          <div style="background-color: #22333B; padding: 15px; text-align: center; color: #EAE0D5; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Travel Vibes. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    // Send confirmation email to user
    await transporter.sendMail(userConfirmation);
    
    res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error processing your request' });
  }
});

// Catch-all handler for React SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
