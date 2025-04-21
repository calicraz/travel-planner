import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faBriefcase, faGlassMartini } from '@fortawesome/free-solid-svg-icons';
import airports from '../data/airports';
import config from '../config';
import './TravelForm.css';

const TravelForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    from: '',
    to: '',
    tripType: 'round',
    departureDate: '',
    returnDate: '',
    cabinClass: 'economy',
    paymentType: 'cash',
    currentCashRate: '',
    currentMilesAmount: '',
    currentMilesTaxes: ''
  });

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = true;
      isValid = false;
    }
    
    // Validate from destination
    if (!formData.from.trim()) {
      newErrors.from = true;
      isValid = false;
    }
    
    // Validate to destination
    if (!formData.to.trim()) {
      newErrors.to = true;
      isValid = false;
    }
    
    // Validate departure date
    if (!formData.departureDate) {
      newErrors.departureDate = true;
      isValid = false;
    }
    
    // Validate return date for round trips
    if (formData.tripType === 'round' && !formData.returnDate) {
      newErrors.returnDate = true;
      isValid = false;
    }
    
    // Validate current rate fields
    if (formData.paymentType === 'cash' && !formData.currentCashRate) {
      newErrors.currentCashRate = true;
      isValid = false;
    } else if (formData.paymentType === 'miles') {
      if (!formData.currentMilesAmount) {
        newErrors.currentMilesAmount = true;
        isValid = false;
      }
      if (!formData.currentMilesTaxes) {
        newErrors.currentMilesTaxes = true;
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  // UI state
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [fromDropdown, setFromDropdown] = useState([]);
  const [toDropdown, setToDropdown] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  
  // References
  const popupRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  // Get today's date in the format needed for date inputs
  const today = new Date().toISOString().split('T')[0];

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear error for this field if any
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: false
      });
    }
    
    // Handle airport search for 'from' and 'to' fields
    if (id === 'from' && value.length > 0) {
      handleAirportSearch(value, 'from');
    } else if (id === 'to' && value.length > 0) {
      handleAirportSearch(value, 'to');
    }
  };

  // Handle airport search and filtering
  const handleAirportSearch = (query, fieldName) => {
    const searchTerm = query.toLowerCase();
    const filteredAirports = airports.filter(airport => 
      airport.name.toLowerCase().includes(searchTerm) || 
      airport.code.toLowerCase().includes(searchTerm) || 
      airport.city.toLowerCase().includes(searchTerm) ||
      airport.country.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to first 10 matches
    
    if (fieldName === 'from') {
      setFromDropdown(filteredAirports);
      setShowFromDropdown(filteredAirports.length > 0);
    } else {
      setToDropdown(filteredAirports);
      setShowToDropdown(filteredAirports.length > 0);
    }
  };
  
  // Handle airport selection from dropdown
  const handleAirportSelect = (airport, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: `${airport.code} - ${airport.name}`
    });
    
    if (fieldName === 'from') {
      setShowFromDropdown(false);
    } else {
      setShowToDropdown(false);
    }
  };
  
  // Toggle trip type
  const handleTripTypeChange = (type) => {
    setFormData({
      ...formData,
      tripType: type,
      // Clear return date if one-way is selected
      returnDate: type === 'one-way' ? '' : formData.returnDate
    });
  };
  
  // Handle cabin class selection
  const handleCabinClassChange = (cabinClass) => {
    setFormData({
      ...formData,
      cabinClass
    });
  };
  
  // Handle payment type change
  const handlePaymentTypeChange = (type) => {
    setFormData({
      ...formData,
      paymentType: type,
      // Reset values when switching types
      currentCashRate: type === 'cash' ? formData.currentCashRate : '',
      currentMilesAmount: type === 'miles' ? formData.currentMilesAmount : '',
      currentMilesTaxes: type === 'miles' ? formData.currentMilesTaxes : ''
    });
  };
  
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fromInputRef.current && !fromInputRef.current.contains(e.target)) {
        setShowFromDropdown(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(e.target)) {
        setShowToDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Success message component
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Show animation while submitting
        if (popupRef.current) {
          popupRef.current.classList.add('success-animation');
        }
        
        if (config.USE_MOCK_API) {
          // For GitHub Pages demo, simulate a successful API response
          console.log('Mock API call with data:', formData);
          // Simulate a delay for better user experience
          await new Promise(resolve => setTimeout(resolve, 800));
        } else {
          // Send data to server
          const response = await fetch(`${config.API_URL}/submit-form`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        }
        
        // Show success message
        setShowSuccess(true);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        // You could show an error message to the user here
        alert('There was an error submitting your request. Please try again later.');
      } finally {
        // Remove animation class after it completes
        setTimeout(() => {
          if (popupRef.current) {
            popupRef.current.classList.remove('success-animation');
          }
        }, 500);
      }
    }
  };

  // Success message component
  const SuccessMessage = () => (
    <div className={`success-message ${showSuccess ? 'visible' : ''}`}>
      <div style={{ fontSize: '70px', marginBottom: '20px' }}>✈️</div>
      <h2 style={{ color: 'var(--cream)', marginBottom: '15px', fontSize: '1.8rem' }}>
        Thanks, {formData.name}!
      </h2>
      <p style={{ color: 'var(--tan)', marginBottom: '20px', fontSize: '1.1rem' }}>
        We're on the hunt for your perfect travel deal
      </p>
      <p style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>
        Check your email at <strong>{formData.email}</strong> for updates
      </p>
      <p style={{ color: 'var(--tan)', marginTop: '30px', fontSize: '0.9rem' }}>
        We'll get back to you within 48 hours if we find a better rate!
      </p>
    </div>
  );
  
  return (
    <div className="travel-form-container">
      <div className="popup" ref={popupRef}>
        <h1 className="title">✨ Let's Beat Your Flight Price ✨</h1>
        <p className="subtitle">Score epic flight deals curated just for you</p>
        
        <form onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            {errors.name && <p className="error-message visible">Please enter your name</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Where we'll send your travel deals" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            {errors.email && <p className="error-message visible">Please enter a valid email</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="whatsapp">
              WhatsApp <span className="optional-tag">(optional)</span>
            </label>
            <input 
              type="tel" 
              id="whatsapp" 
              className="form-input"
              placeholder="For faster updates" 
              value={formData.whatsapp}
              onChange={handleInputChange}
            />
          </div>
          
          {/* Travel Details Section */}
          <div className="form-group">
            <label className="form-label" htmlFor="from">Flying From</label>
            <div className="airport-select" ref={fromInputRef}>
              <input 
                type="text" 
                id="from" 
                className={`form-input ${errors.from ? 'error' : ''}`}
                placeholder="City or airport code" 
                value={formData.from}
                onChange={handleInputChange}
                onFocus={() => formData.from && handleAirportSearch(formData.from, 'from')}
                autoComplete="off"
                required 
              />
              {showFromDropdown && (
                <div className="airport-dropdown">
                  {fromDropdown.map((airport) => (
                    <div 
                      key={airport.code}
                      className="airport-option"
                      onClick={() => handleAirportSelect(airport, 'from')}
                    >
                      <span className="airport-code">{airport.code}</span> 
                      {airport.name} - {airport.city}, {airport.country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.from && <p className="error-message visible">Please enter your departure location</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="to">Flying To</label>
            <div className="airport-select" ref={toInputRef}>
              <input 
                type="text" 
                id="to" 
                className={`form-input ${errors.to ? 'error' : ''}`}
                placeholder="City or airport code" 
                value={formData.to}
                onChange={handleInputChange}
                onFocus={() => formData.to && handleAirportSearch(formData.to, 'to')}
                autoComplete="off"
                required 
              />
              {showToDropdown && (
                <div className="airport-dropdown">
                  {toDropdown.map((airport) => (
                    <div 
                      key={airport.code}
                      className="airport-option"
                      onClick={() => handleAirportSelect(airport, 'to')}
                    >
                      <span className="airport-code">{airport.code}</span> 
                      {airport.name} - {airport.city}, {airport.country}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.to && <p className="error-message visible">Please enter your destination</p>}
          </div>

          {/* Trip Type Section */}
          <div className="form-group">
            <label className="form-label">Trip Type</label>
            <div className="trip-type">
              <div 
                className={`trip-option ${formData.tripType === 'round' ? 'active' : ''}`}
                onClick={() => handleTripTypeChange('round')}
              >
                Round Trip
              </div>
              <div 
                className={`trip-option ${formData.tripType === 'one-way' ? 'active' : ''}`}
                onClick={() => handleTripTypeChange('one-way')}
              >
                One Way
              </div>
            </div>
          </div>

          {/* Dates Section */}
          <div className="form-group">
            <label className="form-label">Travel Dates</label>
            <div className="dates-container">
              <div className="date-input">
                <input 
                  type="date" 
                  id="departureDate"
                  className={`form-input ${errors.departureDate ? 'error' : ''}`}
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  min={today}
                  required 
                />
                {errors.departureDate && <p className="error-message visible">Please select departure date</p>}
              </div>
              {formData.tripType === 'round' && (
                <div className="date-input">
                  <input 
                    type="date" 
                    id="returnDate"
                    className={`form-input ${errors.returnDate ? 'error' : ''}`}
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    min={formData.departureDate || today}
                    required 
                  />
                  {errors.returnDate && <p className="error-message visible">Please select return date</p>}
                </div>
              )}
            </div>
          </div>

          {/* Cabin Class Section */}
          <div className="form-group">
            <label className="form-label">Cabin Class</label>
            <div className="cabin-options">
              <div 
                className={`cabin-option ${formData.cabinClass === 'economy' ? 'active' : ''}`}
                onClick={() => handleCabinClassChange('economy')}
              >
                <FontAwesomeIcon icon={faChair} /> Economy
              </div>
              <div 
                className={`cabin-option ${formData.cabinClass === 'premium' ? 'active' : ''}`}
                onClick={() => handleCabinClassChange('premium')}
              >
                <FontAwesomeIcon icon={faChair} /> Premium Economy
              </div>
              <div 
                className={`cabin-option ${formData.cabinClass === 'business' ? 'active' : ''}`}
                onClick={() => handleCabinClassChange('business')}
              >
                <FontAwesomeIcon icon={faBriefcase} /> Business
              </div>
              <div 
                className={`cabin-option ${formData.cabinClass === 'first' ? 'active' : ''}`}
                onClick={() => handleCabinClassChange('first')}
              >
                <FontAwesomeIcon icon={faGlassMartini} /> First Class
              </div>
            </div>
          </div>

          {/* Current Rate Section */}
          <div className="form-group">
            <label className="form-label">Your Current Rate</label>
            <p className="rate-description">Tell us what you're currently paying so we can try to beat it</p>
            
            <div className="payment-type">
              <div 
                className={`payment-option ${formData.paymentType === 'cash' ? 'active' : ''}`}
                onClick={() => handlePaymentTypeChange('cash')}
              >
                <input 
                  type="radio" 
                  name="paymentType" 
                  value="cash" 
                  checked={formData.paymentType === 'cash'}
                  onChange={() => handlePaymentTypeChange('cash')}
                />
                <span>Cash Rate</span>
              </div>
              <div 
                className={`payment-option ${formData.paymentType === 'miles' ? 'active' : ''}`}
                onClick={() => handlePaymentTypeChange('miles')}
              >
                <input 
                  type="radio" 
                  name="paymentType" 
                  value="miles" 
                  checked={formData.paymentType === 'miles'}
                  onChange={() => handlePaymentTypeChange('miles')}
                />
                <span>Miles + Taxes Rate</span>
              </div>
            </div>
            
            {formData.paymentType === 'cash' ? (
              <div className="price-input">
                <span className="currency">$</span>
                <input 
                  type="number" 
                  id="currentCashRate"
                  className={`form-input ${errors.currentCashRate ? 'error' : ''}`}
                  placeholder="Your current cash rate" 
                  value={formData.currentCashRate}
                  onChange={handleInputChange}
                  required
                />
                {errors.currentCashRate && <p className="error-message visible">Please enter your current cash rate</p>}
              </div>
            ) : (
              <div className="miles-input-group">
                <div className="price-input">
                  <input 
                    type="number" 
                    id="currentMilesAmount"
                    className={`form-input ${errors.currentMilesAmount ? 'error' : ''}`}
                    placeholder="Number of miles required" 
                    value={formData.currentMilesAmount}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="unit">miles</span>
                  {errors.currentMilesAmount && <p className="error-message visible">Please enter the miles amount</p>}
                </div>
                <div className="price-input">
                  <span className="currency">$</span>
                  <input 
                    type="number" 
                    id="currentMilesTaxes"
                    className={`form-input ${errors.currentMilesTaxes ? 'error' : ''}`}
                    placeholder="Taxes and fees amount" 
                    value={formData.currentMilesTaxes}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.currentMilesTaxes && <p className="error-message visible">Please enter the taxes amount</p>}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Let's Cop a Better Deal 🎯
          </button>
        </form>
        
        <p className="info-text">We'll get back to you within 48 hours if our team can secure a better rate!</p>
        
        {showSuccess && <SuccessMessage />}
      </div>
    </div>
  );
};

export default TravelForm;
