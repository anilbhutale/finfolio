import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const bankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerBankAccount: builder.mutation({
      query: (bankAccount) => ({
        url: `${BASE_URL}/bank-accounts/`,
        method: 'POST',
        body: bankAccount,
      }),
    }),
    getAllBankAccounts: builder.query({
      query: () => ({
        url: `${BASE_URL}/bank-accounts/`,
        method: 'GET',
      }),
    }),
    getBankAccountById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/bank-accounts/${id}/`,
        method: 'GET',
      }),
    }),
    updateBankAccount: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_URL}/bank-accounts/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBankAccount: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/bank-accounts/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterBankAccountMutation,
  useGetAllBankAccountsQuery,
  useGetBankAccountByIdQuery,
  useUpdateBankAccountMutation,
  useDeleteBankAccountMutation,
} = bankAccountApiSlice;
