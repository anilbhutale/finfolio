import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: (transactionType) => ({
        url: `${BASE_URL}/transactions/`,
        method: 'GET',
        params: {
          transaction_type: transactionType,
        },
      }),
    }),
    getTransactionById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/transactions/${id}`,
        method: 'GET',
      }),
    }),
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: `${BASE_URL}/transactions/`,
        method: 'POST',
        body: transaction,
      }),
    }),
    updateTransaction: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/transactions/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/transactions/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApiSlice;
