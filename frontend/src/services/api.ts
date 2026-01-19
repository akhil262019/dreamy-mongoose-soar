import axios from 'axios';

// Replace with your Flask backend URL if it's not running on localhost:5000
// Use Vite's environment variables for configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // For Flask-Login session cookies to work, this is crucial
  withCredentials: true,
});

// Optional: Add an interceptor to handle errors or token refresh if using JWT
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle specific errors, e.g., redirect to login on 401
//     if (error.response && error.response.status === 401) {
//       // Example: Redirect to login if session expired or invalid
//       // You might need to use Vue Router's instance here, which can be tricky in interceptors
//       // A common pattern is to emit an event that the main app listens to.
//       console.error('Unauthorized access - redirecting to login');
//       // window.location.href = '/login'; // Simple redirect, but not ideal for SPAs
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;