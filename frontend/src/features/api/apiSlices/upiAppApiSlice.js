// src/apiSlices/upiAppApiSlice.js
import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const upiAppApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUpiApps: builder.query({
      query: () => ({
        url: `${BASE_URL}/upi-app/`,
        method: 'GET',
      }),
    }),
    getUpiAppById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/upi-app/${id}/`,
        method: 'GET',
      }),
    }),
    createUpiApp: builder.mutation({
      query: (upiApp) => ({
        url: `${BASE_URL}/upi-app/`,
        method: 'POST',
        body: upiApp,
      }),
    }),
    updateUpiApp: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${BASE_URL}/upi-app/${id}/`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteUpiApp: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/upi-app/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUpiAppsQuery,
  useGetUpiAppByIdQuery,
  useCreateUpiAppMutation,
  useUpdateUpiAppMutation,
  useDeleteUpiAppMutation,
} = upiAppApiSlice;
