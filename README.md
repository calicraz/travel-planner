# Travel Booking Form

A modern, Gen Z-friendly travel booking form with an earthen luxe color palette (#22333B, #EAE0D5, #C6AC8E). This interactive popup form allows users to submit their travel preferences and receive personalized travel deals.

## Features

- Modern, sleek design with smooth transitions
- Airport code dropdown with autocomplete
- Dynamic form validation
- Email notifications for both admin and users
- Responsive design that works on all devices
- Secure backend with rate limiting and other security measures

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Gmail account (or another email service) for sending notifications

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/travel-planner.git
   cd travel-planner
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your email credentials
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=thecalicrazies@gmail.com
   ```

### Setting Up Email with Gmail

To use Gmail for sending emails:

1. Go to your Google Account settings
2. Navigate to Security > App passwords
   - Note: You may need to have 2-Factor Authentication enabled
3. Select "Mail" as the app and your device
4. Click "Generate"
5. Use the generated 16-character password in your `.env` file

## Running the Application

### Development Mode

```
# Start the React development server
npm start

# In a separate terminal, start the backend server
node server.js
```

The app will be available at http://localhost:3000 and the API at http://localhost:3001.

### Production Build

```
# Create production build
npm run build

# Start the server (which will serve the built React app)
NODE_ENV=production node server.js
```

## Deployment Options

### Option 1: Vercel (Frontend) + Heroku (Backend)

#### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Update the API URL in your React app to point to your deployed backend

#### Backend Deployment (Heroku)

1. Create a Heroku account and install the Heroku CLI
2. Initialize a Git repository if not already done
   ```
   heroku create your-app-name
   ```
3. Set up environment variables on Heroku
   ```
   heroku config:set EMAIL_SERVICE=gmail
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set RECIPIENT_EMAIL=thecalicrazies@gmail.com
   heroku config:set NODE_ENV=production
   ```
4. Deploy to Heroku
   ```
   git push heroku main
   ```

### Option 2: Netlify (Frontend) with Netlify Functions (Backend)

1. Create a `netlify.toml` file in the root of your project:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
     functions = "netlify/functions"
   
   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
   ```
2. Convert your Express server to Netlify functions
3. Deploy to Netlify by connecting your GitHub repository

### Option 3: All-in-One Solutions

#### Firebase Hosting + Cloud Functions

1. Install Firebase tools: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init`
3. Deploy: `firebase deploy`

## Sharing Your Application

Once deployed, you can share your application in several ways:

1. **Direct Link**: Share the URL of your deployed application
2. **Embed in Existing Website**: Use an iframe to embed the form on your website
   ```html
   <iframe src="https://your-deployed-app.com" width="100%" height="600px" frameborder="0"></iframe>
   ```
3. **QR Code**: Generate a QR code for your application URL using services like https://www.qr-code-generator.com/

4. **Social Media**: Share the link on social media platforms with an attractive image of the form

## Customization

- **Colors**: Update the color variables in `src/components/TravelForm.css`
- **Form Fields**: Modify the form fields in `src/components/TravelForm.js`
- **Email Templates**: Customize email templates in `server.js`

## Troubleshooting

- **Email Not Sending**: Verify your email credentials and make sure "Less secure app access" is enabled for Gmail
- **CORS Issues**: Ensure the frontend is properly configured to communicate with the backend
- **Deployment Issues**: Check the logs of your hosting platform for specific error messages

## License

MIT

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
