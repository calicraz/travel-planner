// Configuration for different environments
const config = {
  // Local development API URL
  development: {
    API_URL: 'http://localhost:3001/api'
  },
  // Production API URL - update this with your actual backend server URL when deployed
  production: {
    // For GitHub Pages demo purposes, we'll use a mock API service or serverless function
    // In a real application, this would be your actual backend API URL
    API_URL: 'https://your-backend-api.herokuapp.com/api'
    // Alternatively, you could use a serverless function:
    // API_URL: 'https://api.yourdomain.com/api'
  }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';

// For GitHub Pages demo without a real backend, you can set this to true
// to mock the API response instead of actually sending a request
const USE_MOCK_API = true;

// Export the configuration for the current environment
export default {
  ...config[env],
  USE_MOCK_API,
  BASE_PATH: '/travel-planner' // GitHub Pages repository name for correct routing
};

