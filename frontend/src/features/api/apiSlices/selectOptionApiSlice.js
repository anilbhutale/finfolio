// src/apiSlices/selectOptionApiSlice.js
import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const selectOptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSelectOptions: builder.query({
      query: () => `${BASE_URL}/categories/`,
    }),
    getSelectOptionById: builder.query({
      query: (id) => `${BASE_URL}/categories/${id}/`,
    }),
    getSelectOptionsByCategory: builder.query({
      query: (category) => `${BASE_URL}/category/${category}/`,
    }),
    createSelectOption: builder.mutation({
      query: (selectOption) => ({
        url: `${BASE_URL}/categories/`,
        method: 'POST',
        body: selectOption,
      }),
    }),
    updateSelectOption: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${BASE_URL}/categories/${id}/`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteSelectOption: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/categories/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllSelectOptionsQuery,
  useGetSelectOptionByIdQuery,
  useGetSelectOptionsByCategoryQuery,
  useCreateSelectOptionMutation,
  useUpdateSelectOptionMutation,
  useDeleteSelectOptionMutation,
} = selectOptionApiSlice;
