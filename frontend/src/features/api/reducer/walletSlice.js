import { createSlice } from '@reduxjs/toolkit';
import { walletApiSlice } from '../apiSlices/walletApiSlice';

const walletSlice = createSlice({
  name: 'wallets',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedWallet(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllWallets
      .addMatcher(
        walletApiSlice.endpoints.getAllWallets.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.getAllWallets.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.getAllWallets.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle getWalletById
      .addMatcher(
        walletApiSlice.endpoints.getWalletById.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.getWalletById.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.selected = action.payload;
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.getWalletById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle createWallet
      .addMatcher(
        walletApiSlice.endpoints.createWallet.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.createWallet.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.createWallet.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle updateWallet
      .addMatcher(
        walletApiSlice.endpoints.updateWallet.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.updateWallet.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          const index = state.list.findIndex(
            (wallet) => wallet.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.updateWallet.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle deleteWallet
      .addMatcher(
        walletApiSlice.endpoints.deleteWallet.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.deleteWallet.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = state.list.filter(
            (wallet) => wallet.id !== action.meta.arg
          );
        }
      )
      .addMatcher(
        walletApiSlice.endpoints.deleteWallet.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearSelectedWallet } = walletSlice.actions;

export default walletSlice.reducer;
