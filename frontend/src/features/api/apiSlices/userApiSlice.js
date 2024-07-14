import { apiSlice } from '../apiSlice';
import { USERS_URL, TOKEN, BASE_URL } from '../endpoints';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register/`,
        method: 'POST',
        body: data,
      }),
    }),
    sendOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/send-otp`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-otp`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${TOKEN}/`,
        method: 'POST',
        body: data,
      }),
    }),
    user: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: 'GET',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: 'GET',
      }),
    }),
    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/reset-password`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useUserMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} = userApiSlice;
