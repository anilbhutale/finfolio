// src/features/upiApp/upiAppSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { upiAppApiSlice } from '../apiSlices/upiAppApiSlice';

const upiAppSlice = createSlice({
  name: 'upiApp',
  initialState: {
    upiApps: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Define your local reducers here
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        upiAppApiSlice.endpoints.getAllUpiApps.matchFulfilled,
        (state, action) => {
          state.upiApps = action.payload;
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        upiAppApiSlice.endpoints.getAllUpiApps.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        upiAppApiSlice.endpoints.createUpiApp.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        upiAppApiSlice.endpoints.createUpiApp.matchFulfilled,
        (state, action) => {
          state.upiApps.push(action.payload);
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        upiAppApiSlice.endpoints.createUpiApp.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default upiAppSlice.reducer;
