import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import transactionsReducer from '../features/transactionsSlice';
import exchangeRatesReducer from '../features/exchangeRatesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    transactions: transactionsReducer,
    exchangeRates: exchangeRatesReducer,
  },
});
