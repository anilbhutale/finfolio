import { apiSlice } from '../apiSlice';
import { BASE_URL } from '../endpoints';

export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWallets: builder.query({
      query: () => ({
        url: `${BASE_URL}/wallets/`,
        method: 'GET',
      }),
    }),
    getWalletById: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/wallets/${id}/`,
        method: 'GET',
      }),
    }),
    createWallet: builder.mutation({
      query: (wallet) => ({
        url: `${BASE_URL}/wallets/`,
        method: 'POST',
        body: wallet,
      }),
    }),
    updateWallet: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `${BASE_URL}/wallets/${id}/`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteWallet: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/wallets/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllWalletsQuery,
  useGetWalletByIdQuery,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = walletApiSlice;
