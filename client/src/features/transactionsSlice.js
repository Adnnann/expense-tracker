import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserTransactions = createAsyncThunk('transactions/userTransactions', async () => {
  return await axios
    .get('/api/transaction')
    .then((response) => response.data)
    .catch((error) => error);
});

export const createTransaction = createAsyncThunk(
  'users/addUserTransaction',
  async (transaction) => {
    return await axios
      .post(`/api/transaction`, transaction, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  },
);
export const updateUserTransaction = createAsyncThunk(
  'users/updateUserTransaction',
  async (transaction) => {
    return await axios
      .put(
        `/api/transaction/${transaction.params}`,
        {
          title: transaction.title,
          amountInBAM: transaction.amountInBAM,
          amountInEUR: transaction.amountInEUR,
          amountInUSD: transaction.amountInUSD,
          currency: transaction.currency,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => error);
  },
);

export const deleteTransaction = createAsyncThunk('users/deleteTransaction', async (params) => {
  const response = await axios.delete(`/api/transaction/${params}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const fetchUserTransactionData = createAsyncThunk(
  'users/transactionData',
  async (params) => {
    return await axios
      .get(`/api/transaction/${params}`)
      .then((response) => response.data)
      .catch((error) => error);
  },
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    userTransactions: {
      success: false,
      loading: false,
      error: false,
      data: [],
    },
    addUserTransaction: {
      success: false,
      loading: false,
      error: false,
      data: [],
    },
    filter: { income: 'income', expense: 'expense' },
    currencyExchangeRate: 1,
    currency: 'BAM',
    groupingVar: 'day',
    updatedUserTransaction: {
      success: false,
      loading: false,
      error: false,
      data: [],
    },
    deleteTransaction: {
      success: false,
      loading: false,
      error: false,
      data: [],
    },
    userTransactionData: {
      success: false,
      loading: false,
      error: false,
      data: [],
    },
    deleteId: '',
    openDeleteModal: false,
    transactionsOverviewLevel: 'Daily',
  },
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
    setGroupingVar: (state, action) => {
      state.groupingVar = action.payload;
    },
    setDeleteId: (state, action) => {
      state.deleteId = action.payload;
    },
    setOpenDeleteModal: (state, action) => {
      state.openDeleteModal = action.payload;
    },
    setOpenDeleteModal: (state, payload) => {
      state.deleteTransaction = {};
    },

    
  },
  extraReducers: {
    [fetchUserTransactions.pending]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: true,
          success: false,
          error: false,
          data: payload,
        },
      };
    },
    [fetchUserTransactions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: false,
          success: true,
          error: false,
          data: payload.message,
        },
      };
    },
    [fetchUserTransactions.rejected]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: false,
          success: false,
          error: true,
          data: payload.error,
        },
      };
    },
    [createTransaction.pending]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: true,
          success: false,
          error: false,
          data: payload,
        },
      };
    },
    [createTransaction.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: false,
          success: true,
          error: false,
          data: payload.message,
        },
      };
    },
    [createTransaction.rejected]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: false,
          success: false,
          error: true,
          data: payload.error,
        },
      };
    },
    [updateUserTransaction.pending]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: true,
          success: false,
          error: false,
          data: payload,
        }
    }
  },
    [updateUserTransaction.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        userTransactions: {
          loading: false,
          success: true,
          error: false,
          data: payload.message,
        }
      }

  },
  [updateUserTransaction.rejected]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: false,
        success: false,
        error: true,
        data: payload.error,
      },
    };
  },
  [deleteTransaction.pending]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: true,
        success: false,
        error: false,
        data: payload,
      },
    };
  },
  [deleteTransaction.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: false,
        success: true,
        error: false,
        data: payload.message,
      },
    };
  },
  [deleteTransaction.rejected]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: false,
        success: false,
        error: true,
        data: payload.error,
      },
    };
  },
  },
  [fetchUserTransactionData.pending]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: true,
        success: false,
        error: false,
        data: payload,
      },
    };
  }
  [fetchUserTransactionData.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: false,
        success: true,
        error: false,
        data: payload.message,
      },
    };
  },
  [fetchUserTransactionData.rejected]: (state, { payload }) => {
    return {
      ...state,
      userTransactions: {
        loading: false,
        success: false,
        error: true,
        data: payload.error,
      },
    };
  },
});




export const getUserTransactions = (state) => state.users.userTransactions;
export const getDashboardData = (state) => state.users.dashboardData;
export const getTransactionData = (state) => state.users.addUserTransaction;
export const getFilter = (state) => state.users.filter;
export const getUpdatedUserTransaction = (state) => state.users.updatedUserTransaction;
export const getUserTransactionData = (state) => state.users.userTransactionData;
export const getDeleteId = (state) => state.users.deleteId;
export const getOpenDeleteModal = (state) => state.users.openDeleteModal;
export const getDeleteAPIMessage = (state) => state.users.deleteTransaction;
export const getTransactionsOverviewLevel = (state) => state.users.transactionsOverviewLevel;

export const {
  cleanTransactionData, 
  cleanTransactionUpdatedData, 
  setFilter,setGroupingVar,
  setDeleteId,
  setOpenDeleteModal, 
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
