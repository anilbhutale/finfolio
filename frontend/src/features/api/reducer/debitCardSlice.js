import { createSlice } from '@reduxjs/toolkit';
import { debitCardApiSlice } from '../apiSlices/debitCardApiSlice';

const debitCardSlice = createSlice({
  name: 'debitCards',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedDebitCard(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        debitCardApiSlice.endpoints.getAllDebitCards.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.getAllDebitCards.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.getAllDebitCards.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.getDebitCardById.matchFulfilled,
        (state, action) => {
          state.selected = action.payload;
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.createDebitCard.matchFulfilled,
        (state, action) => {
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.updateDebitCard.matchFulfilled,
        (state, action) => {
          const index = state.list.findIndex(
            (debitCard) => debitCard.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        debitCardApiSlice.endpoints.deleteDebitCard.matchFulfilled,
        (state, action) => {
          state.list = state.list.filter(
            (debitCard) => debitCard.id !== action.payload.id
          );
        }
      );
  },
});

export const { clearSelectedDebitCard } = debitCardSlice.actions;

export default debitCardSlice.reducer;
