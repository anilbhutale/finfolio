import { createSlice } from '@reduxjs/toolkit';
import { invoiceGroupApiSlice } from '../apiSlices/InvoiceGroupSlice';

const invoiceGroupSlice = createSlice({
  name: 'invoice_group',
  initialState: {
    list: null,
    item: null,
    listc: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getAllInvoiceCategories.matchPending,
        (state) => {
          state.list = { loading: true };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getAllInvoiceCategories.matchFulfilled,
        (state, action) => {
          state.list = { value: action.payload };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getAllInvoiceCategories.matchRejected,
        (state, action) => {
          state.list = { error: action.error };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoiceById.matchPending,
        (state) => {
          state.item = { loading: true };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoiceById.matchFulfilled,
        (state, action) => {
          state.item = { value: action.payload };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoiceById.matchRejected,
        (state, action) => {
          state.item = { error: action.error };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoicesByCategory.matchPending,
        (state) => {
          state.listc = { loading: true };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoicesByCategory.matchFulfilled,
        (state, action) => {
          state.listc = { value: action.payload };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.getInvoicesByCategory.matchRejected,
        (state, action) => {
          state.listc = { error: action.error };
        }
      )
      .addMatcher(
        invoiceGroupApiSlice.endpoints.deleteInvoice.matchFulfilled,
        (state, action) => {
          state.list.value = state.list.value.filter(
            (x) => x.id !== action.meta.arg
          );
        }
      );
  },
});

export default invoiceGroupSlice.reducer;
