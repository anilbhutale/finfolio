import { createSlice } from '@reduxjs/toolkit';
import { creditCardApiSlice } from '../apiSlices/creditCardApiSlice';

const creditCardSlice = createSlice({
  name: 'creditCards',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedCreditCard(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        creditCardApiSlice.endpoints.getAllCreditCards.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.getAllCreditCards.matchFulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.getAllCreditCards.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.getCreditCardById.matchFulfilled,
        (state, action) => {
          state.selected = action.payload;
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.createCreditCard.matchFulfilled,
        (state, action) => {
          state.list.push(action.payload);
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.updateCreditCard.matchFulfilled,
        (state, action) => {
          const index = state.list.findIndex(
            (creditCard) => creditCard.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addMatcher(
        creditCardApiSlice.endpoints.deleteCreditCard.matchFulfilled,
        (state, action) => {
          state.list = state.list.filter(
            (creditCard) => creditCard.id !== action.payload.id
          );
        }
      );
  },
});

export const { clearSelectedCreditCard } = creditCardSlice.actions;

export default creditCardSlice.reducer;
