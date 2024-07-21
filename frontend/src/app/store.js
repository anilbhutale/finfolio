import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';

import loaderReducer from '../features/loader/loaderSlice';
import authReducer from '../features/authenticate/authSlice';
import logoutModalReducer from '../features/logoutModal/logoutModalSlice';
import transactionViewAndUpdateModalReducer from '../features/TransactionModals/viewAndUpdateModal';
import deleteTransactionModalReducer from '../features/TransactionModals/deleteModal';
import { transactionApiSlice } from '../features/api/apiSlices/transactionApiSlice';
import { invoiceApiSlice } from '../features/api/apiSlices/invoiceApiSlice';
import transactionReducer from '../features/api/reducer/transactionSlice';
import invoiceReducer from '../features/api/reducer/invoiceSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loader: loaderReducer,
    auth: authReducer,
    logoutModal: logoutModalReducer,
    transactionViewAndUpdateModal: transactionViewAndUpdateModalReducer,
    deleteTransactionModal: deleteTransactionModalReducer,
    [transactionApiSlice.reducerPath]: transactionApiSlice.reducer,
    transactions: transactionReducer,
    // Add the invoice slice reducer
    [invoiceApiSlice.reducerPath]: invoiceApiSlice.reducer,
    invoices: invoiceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
