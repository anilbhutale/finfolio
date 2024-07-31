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
import InvoiceGroupReducer from '../features/api/reducer/InvoiceGroupSlice';
import bankAccountReducer from '../features/api/reducer/bankAccountSlice';
import debitCardReducer from '../features/api/reducer/debitCardSlice';
import walletReducer from '../features/api/reducer/walletSlice';
import upiReducer from '../features/api/reducer/upiSlice';
import selectOptionReducer from '../features/api/reducer/selectOptionSlice';
import upiAppReducer from '../features/api/reducer/upiAppSlice';
import creditCardReducer from '../features/api/reducer/creditCardSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    loader: loaderReducer,
    auth: authReducer,
    logoutModal: logoutModalReducer,
    transactionViewAndUpdateModal: transactionViewAndUpdateModalReducer,
    deleteTransactionModal: deleteTransactionModalReducer,
    transactions: transactionReducer,
    invoices: invoiceReducer,
    invoiceGroup: InvoiceGroupReducer,
    bankAccount: bankAccountReducer,
    debitCards: debitCardReducer,
    creditCards: creditCardReducer,
    wallet: walletReducer,
    upi: upiReducer,
    select_options: selectOptionReducer,
    upiApps: upiAppReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
