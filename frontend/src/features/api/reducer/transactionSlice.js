// transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { transactionApiSlice } from '../apiSlices/transactionApiSlice';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedTransaction(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        transactionApiSlice.endpoints.getAllTransactions.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.getAllTransactions.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.getAllTransactions.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.getTransactionById.matchFulfilled,
        (state, action) => {
          state.selected = action.payload;
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.createTransaction.matchFulfilled,
        (state, action) => {
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.updateTransaction.matchFulfilled,
        (state, action) => {
          const index = state.list.findIndex(
            (transaction) => transaction.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        transactionApiSlice.endpoints.deleteTransaction.matchFulfilled,
        (state, action) => {
          debugger;
          state.list = state.list.filter(
            (transaction) => transaction.id != action.meta.arg.originalArgs
          );
        }
      );
  },
});

export const { clearSelectedTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
