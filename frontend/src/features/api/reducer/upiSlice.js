// src/slices/upilice.js
import { createSlice } from '@reduxjs/toolkit';
import { upiApiSlice } from '../apiSlices/upiApiSlice';

const upilice = createSlice({
  name: 'upi',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedUpi(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getAllUpi
      .addMatcher(upiApiSlice.endpoints.getAllUpi.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        upiApiSlice.endpoints.getAllUpi.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        upiApiSlice.endpoints.getAllUpi.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle getUpiById
      .addMatcher(upiApiSlice.endpoints.getUpiById.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        upiApiSlice.endpoints.getUpiById.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.selected = action.payload;
        }
      )
      .addMatcher(
        upiApiSlice.endpoints.getUpiById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle createUpi
      .addMatcher(upiApiSlice.endpoints.createUpi.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        upiApiSlice.endpoints.createUpi.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        upiApiSlice.endpoints.createUpi.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle updateUpi
      .addMatcher(upiApiSlice.endpoints.updateUpi.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        upiApiSlice.endpoints.updateUpi.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          const index = state.list.findIndex(
            (upi) => upi.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        upiApiSlice.endpoints.updateUpi.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      // Handle deleteUpi
      .addMatcher(upiApiSlice.endpoints.deleteUpi.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(
        upiApiSlice.endpoints.deleteUpi.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = state.list.filter((upi) => upi.id !== action.meta.arg);
        }
      )
      .addMatcher(
        upiApiSlice.endpoints.deleteUpi.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearSelectedUpi } = upilice.actions;

export default upilice.reducer;
