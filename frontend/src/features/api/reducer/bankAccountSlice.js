import { createSlice } from '@reduxjs/toolkit';
import { bankAccountApiSlice } from '../apiSlices/bankAccountApiSlice';

const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState: {
    list: null,
    item: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        bankAccountApiSlice.endpoints.getAllBankAccounts.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.getAllBankAccounts.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.getAllBankAccounts.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.getBankAccountById.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.getBankAccountById.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.item = action.payload;
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.getBankAccountById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        bankAccountApiSlice.endpoints.deleteBankAccount.matchFulfilled,
        (state, action) => {
          state.list = state.list.filter(
            (account) => account.id !== action.meta.arg
          );
        }
      );
  },
});

export default bankAccountSlice.reducer;
