import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'https://api.loan1.io/api', // Replace with your API's base URL
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access - maybe redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default api;
