// src/apiSlices/upiApiSlice.js
import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const upiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUpi: builder.query({
      query: () => ({
        url: `${BASE_URL}/upi/`,
        method: 'GET',
      }),
    }),
    getUpiById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/upi/${id}/`,
        method: 'GET',
      }),
    }),
    createUpi: builder.mutation({
      query: (upi) => ({
        url: `${BASE_URL}/upi/`,
        method: 'POST',
        body: upi,
      }),
    }),
    updateUpi: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${BASE_URL}/upi/${id}/`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteUpi: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/upi/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUpiQuery,
  useGetUpiByIdQuery,
  useCreateUpiMutation,
  useUpdateUpiMutation,
  useDeleteUpiMutation,
} = upiApiSlice;
