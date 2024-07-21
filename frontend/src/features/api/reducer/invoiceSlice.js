import { createSlice } from '@reduxjs/toolkit';
import { invoiceApiSlice } from '../apiSlices/invoiceApiSlice';

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedInvoice(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        invoiceApiSlice.endpoints.getAllInvoices.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.getAllInvoices.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.getAllInvoices.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.getInvoiceById.matchFulfilled,
        (state, action) => {
          state.selected = action.payload;
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.registerInvoice.matchFulfilled,
        (state, action) => {
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.updateInvoice.matchFulfilled,
        (state, action) => {
          const index = state.list.findIndex((invoice) => invoice.id === action.payload.id);
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        invoiceApiSlice.endpoints.deleteInvoice.matchFulfilled,
        (state, action) => {
          state.list = state.list.filter((invoice) => invoice.id !== action.payload.id);
        }
      );
  },
});

export const { clearSelectedInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
