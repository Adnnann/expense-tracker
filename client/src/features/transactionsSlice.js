import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
  filter: { income: 'income', expense: 'expense' },
  currencyExchangeRate: 1,
  currency: 'BAM',
  groupingVar: 'day',
  deleteId: '',
  openDeleteModal: false,
  transactionsOverviewLevel: 'Daily',
  transactionToEdit: {},
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    cleanTransactionData: (state, action) => {
      state.addUserTransaction = {};
    },
    cleanTransactionUpdatedData: (state, action) => {
      state.updatedUserTransaction = {};
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setTransactionToEdit: (state, action) => {
      state.transactionToEdit = action.payload;
    },
    setTransactionsOverviewLevel: (state, action) => {
      state.transactionsOverviewLevel = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setOpenDeleteModal: (state, action) => {
      state.openDeleteModal = action.payload;
    },
  }, 
});

export const getGroupingVar = (state) => state.transactions.groupingVar;
export const getUserTransactions = (state) => state.transactions.userTransactions;
export const getDashboardData = (state) => state.transactions.dashboardData;
export const getTransactionData = (state) => state.transactions.addUserTransaction;
export const getFilter = (state) => state.transactions.filter;
export const getUpdatedUserTransaction = (state) => state.transactions.updatedUserTransaction;
export const getUserTransactionData = (state) => state.transactions.userTransactionData;
export const getDeleteId = (state) => state.transactions.deleteId;
export const getOpenDeleteModal = (state) => state.transactions.openDeleteModal;
export const getDeleteAPIMessage = (state) => state.transactions.deleteTransaction;
export const getTransactionsOverviewLevel = (state) => state.transactions.transactionsOverviewLevel;
export const getTransactionToEdit = (state) => state.transactions.transactionToEdit; 

export const {
  cleanTransactionData, 
  cleanTransactionUpdatedData, 
  setFilter,
  setGroupingVar,
  setDeleteId,
  setOpenDeleteModal, 
  setTransactionsOverviewLevel,
  cleanDeleteAPIMessage,
  setTransactionToEdit,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
