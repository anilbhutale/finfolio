import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './endpoints';

// Create a base query with base URL, credentials, and authorization header
const baseQuery = fetchBaseQuery({
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
    console.log(token?.access, '--------');

    if (token) {
      headers.set('Authorization', `Bearer ${token?.access}`);
    }
    return headers;
  },
});

// Define the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
