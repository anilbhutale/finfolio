import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const creditCardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCreditCard: builder.mutation({
      query: (creditCard) => ({
        url: `${BASE_URL}/credit-cards/`,
        method: 'POST',
        body: creditCard,
      }),
    }),
    getAllCreditCards: builder.query({
      query: () => ({
        url: `${BASE_URL}/credit-cards/`,
        method: 'GET',
      }),
    }),
    getCreditCardById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/credit-cards/${id}/`,
        method: 'GET',
      }),
    }),
    updateCreditCard: builder.mutation({
      query: ({ id, creditCard }) => ({
        url: `${BASE_URL}/credit-cards/${id}/`,
        method: 'PUT',
        body: creditCard,
      }),
    }),
    deleteCreditCard: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/credit-cards/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCreditCardMutation,
  useGetAllCreditCardsQuery,
  useGetCreditCardByIdQuery,
  useUpdateCreditCardMutation,
  useDeleteCreditCardMutation,
} = creditCardApiSlice;
