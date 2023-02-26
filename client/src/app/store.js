import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import transactionsReducer from '../features/transactionsSlice';
import exchangeRatesReducer from '../features/exchangeRatesSlice';
import statisticsReducer from '../features/statisticsSlice';
import { transactionsAPI } from '../features/services/transactionsAPI';
import { userAPI } from '../features/services/userAPI';

export const store = configureStore({
  reducer: {
    [transactionsAPI.reducerPath]: transactionsAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    users: usersReducer,
    transactions: transactionsReducer,
    exchangeRates: exchangeRatesReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactionsAPI.middleware, userAPI.middleware),
});
