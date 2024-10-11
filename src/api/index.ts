import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8081/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach the token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;  // Attach token to header
    } 
    return config;
  },
  (error) => {
    // If there's an error, reject the promise
    return Promise.reject(error);
  }
);

export default api;
