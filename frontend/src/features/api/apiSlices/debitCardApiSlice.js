import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const debitCardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDebitCard: builder.mutation({
      query: (debitCard) => ({
        url: `${BASE_URL}/debit-cards/`,
        method: 'POST',
        body: debitCard,
      }),
    }),
    getAllDebitCards: builder.query({
      query: () => ({
        url: `${BASE_URL}/debit-cards/`,
        method: 'GET',
      }),
    }),
    getDebitCardById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/debit-cards/${id}/`,
        method: 'GET',
      }),
    }),
    updateDebitCard: builder.mutation({
      query: ({ id, debitCard }) => ({
        url: `${BASE_URL}/debit-cards/${id}/`,
        method: 'PUT',
        body: debitCard,
      }),
    }),
    deleteDebitCard: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/debit-cards/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateDebitCardMutation,
  useGetAllDebitCardsQuery,
  useGetDebitCardByIdQuery,
  useUpdateDebitCardMutation,
  useDeleteDebitCardMutation,
} = debitCardApiSlice;
