import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './endpoints';
import { useNavigate } from 'react-router-dom';

// Function to handle logout
const handleLogout = () => {
  // Clear the token from localStorage
  localStorage.removeItem('token');

  // Redirect to login page (You may need to use a custom hook or pass `navigate` another way)
  window.location.href = '/login'; // Or use a custom hook for redirection
};

// Create a base query with base URL, credentials, and authorization header
const baseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      let token = null;

      try {
        // Retrieve the token string from localStorage
        const tokenString = localStorage.getItem('token');

        // Check if the tokenString is not null and not equal to the string "undefined"
        if (tokenString && tokenString !== 'undefined') {
          token = JSON.parse(tokenString);
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token?.access}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Handle 401 error by logging out
    handleLogout();
  }

  return result;
};

// Define the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
