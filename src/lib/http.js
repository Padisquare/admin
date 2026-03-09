import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to get token based on environment
const getAuthToken = (ssrToken = null) => {
  // If we're in SSR and have a token passed, use it
  if (ssrToken) {
    return ssrToken;
  }
  
  // If we're in the browser, get from document.cookie
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  
  return null;
};

const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

// Content-Type interceptor
http.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Auth interceptor
http.interceptors.request.use((config) => {
  const AUTH_TOKEN = getAuthToken(config.ssrToken);
  
  if (!config.headers) {
    config.headers = {};
  }
  
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  
  // Clean up the custom ssrToken property
  delete config.ssrToken;
  
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Only redirect in browser environment
      if (typeof window !== 'undefined') {
        // Remove token from cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to create request with SSR token
export const createSSRRequest = (token) => {
  return (config) => {
    return http({
      ...config,
      ssrToken: token
    });
  };
};

export default http;