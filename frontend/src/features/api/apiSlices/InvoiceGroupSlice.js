import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const invoiceGroupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerInvoiceCategory: builder.mutation({
      query: (option) => ({
        url: `${BASE_URL}/invoice_group/categories/`,
        method: 'POST',
        body: option,
      }),
    }),
    registerInvoice: builder.mutation({
      query: (option) => ({
        url: `${BASE_URL}/invoice_group/selections/`,
        method: 'POST',
        body: option,
      }),
    }),
    getAllInvoiceCategories: builder.query({
      query: () => ({
        url: `${BASE_URL}/invoice_group/categories/`,
        method: 'GET',
      }),
    }),
    getInvoiceById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/loans/`,
        method: 'GET',
      }),
    }),
    getInvoicesByCategory: builder.query({
      query: (category) => ({
        url: `${BASE_URL}/invoice_group/category/${category}`,
        method: 'GET',
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterInvoiceCategoryMutation,
  useRegisterInvoiceMutation,
  useGetAllInvoiceCategoriesQuery,
  useGetInvoiceByIdQuery,
  useGetInvoicesByCategoryQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceGroupApiSlice;
