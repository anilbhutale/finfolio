import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerInvoice: builder.mutation({
      query: (invoice) => ({
        url: `${BASE_URL}/invoice/`,
        method: 'POST',
        body: invoice,
      }),
    }),
    getAllInvoices: builder.query({
      query: () => ({
        url: `${BASE_URL}/invoice/`,
        method: 'GET',
      }),
    }),
    getInvoiceById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/invoice/${id}/`,
        method: 'GET',
      }),
    }),
    searchInvoiceById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/invoices/${id}/`,
        method: 'GET',
      }),
    }),
    getInvoicesByCategory: builder.query({
      query: (category) => ({
        url: `${BASE_URL}/invoice/${category}/category/`,
        method: 'GET',
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data, totalAmount }) => {
        let formData = new FormData();
        formData.append('total_amount', totalAmount);
        for (const key in data) {
          if (key === 'invoice') {
            formData.append('items', JSON.stringify(data[key]));
          } else if (key === 'image' && data.image[0]) {
            formData.append('image', data.image[0]);
          } else if (key === 'invoice_date') {
            formData.append('invoice_date', formatDate(data[key]));
          } else if (key === 'user') {
            formData.append('invoice_user', data[key]);
          } else {
            formData.append(key, data[key]);
          }
        }
        return {
          url: `${BASE_URL}/invoice/${id}/`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/invoice/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

function formatDate(invoice_date_str) {
  let date = new Date(invoice_date_str);
  return date.toDateString();
}

export const {
  useRegisterInvoiceMutation,
  useGetAllInvoicesQuery,
  useGetInvoiceByIdQuery,
  useSearchInvoiceByIdQuery,
  useGetInvoicesByCategoryQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = invoiceApiSlice;
