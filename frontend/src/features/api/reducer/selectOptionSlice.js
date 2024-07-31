// src/slices/selectOptionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { selectOptionApiSlice } from '../apiSlices/selectOptionApiSlice';

const selectOptionSlice = createSlice({
  name: 'select_options',
  initialState: {
    list: null,
    item: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedOption(state) {
      state.item = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        selectOptionApiSlice.endpoints.getAllSelectOptions.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getAllSelectOptions.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getAllSelectOptions.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionById.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionById.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.item = action.payload;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionById.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionsByCategory.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionsByCategory
          .matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.getSelectOptionsByCategory.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.createSelectOption.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.createSelectOption.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.createSelectOption.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.updateSelectOption.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.updateSelectOption.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          const index = state.list.findIndex(
            (option) => option.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.updateSelectOption.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.deleteSelectOption.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.deleteSelectOption.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = state.list.filter(
            (option) => option.id !== action.meta.arg
          );
        }
      )
      .addMatcher(
        selectOptionApiSlice.endpoints.deleteSelectOption.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { clearSelectedOption } = selectOptionSlice.actions;

export default selectOptionSlice.reducer;
