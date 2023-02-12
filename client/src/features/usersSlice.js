import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_KEY;
export const createUser = createAsyncThunk('user/registeredUser', async (user) => {
  return await axios
    .post(`api/users/`, user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
});

export const signinUser = createAsyncThunk('users/logedUser', async (userData) => {
  return await axios
    .post('/auth/signin', userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
});

export const signoutUser = createAsyncThunk('users/user', async () => {
  const response = await axios.post('/auth/signout');
  return response.data;
});

export const userToken = createAsyncThunk('users/protected', async () => {
  return await axios
    .get('/protected', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((response) => response.data)
    .catch((error) => error.message);
});

export const fetchUserData = createAsyncThunk('users/profile', async (params) => {
  return await axios
    .get(`/api/users/${params}`)
    .then((response) => response.data)
    .catch((error) => error);
});

export const updateUserData = createAsyncThunk('users/updateUserData', async (user) => {
  return await axios
    .put(
      `/api/users/${user.params}`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
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
});
export const passwordCheck = createAsyncThunk('users/passwordCheck', async (userData) => {
  return await axios
    .post('/auth/signin', userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
});

export const closeAccount = createAsyncThunk('users/closeAccount', async (params) => {
  const response = await axios.delete(`/api/users/${params}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});
export const updateUserPassword = createAsyncThunk('users/updateUserPassword', async (user) => {
  return await axios
    .put(
      `/api/users/${user.params}`,
      { password: user.password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    .then((response) => response.data)
    .catch((error) => error);
});

export const fetchUserTransactions = createAsyncThunk('users/transactions', async () => {
  return await axios
    .get(`/api/transaction`)
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

export const reloginUser = createAsyncThunk('users/loggedUser', async (id) => {
  return await axios
    .post(`/api/users/relogin`, { token: id })
    .then((response) => response.data)
    .catch((error) => error);
});

//obtain currency exchange rate
export const fetchCurrencyExchangeRates = createAsyncThunk(
  'users/currencyExchangeRates',
  async () => {
    const requests = [
      'https://api.api-ninjas.com/v1/convertcurrency?want=USD&have=BAM&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=BAM&amount=1',
      '/api/exchangeRates'
    ];

    return await axios
      .all([axios.get(requests[0]), axios.get(requests[1])])
      .then(
        axios.spread((res1, res2) => [{ USD: res1.data.new_amount, EUR: res2.data.new_amount }]),
      )
      .catch((errors) => {
        console.log(errors);
      });
  },
);

export const fetchSavedExchangeRatesFromDB = createAsyncThunk(
  'users/exchangeRatesFromDB',
  async () => {
    return await axios
      .get(`/api/exchangeRates`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((error) => error);
  },
);

export const saveExchangeRatesInDB = createAsyncThunk('users/saveExchangeRates', async (rates) => {
  return await axios
    .post(`/api/exchangeRates`, rates, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((error) => error);
});

const initialState = {
  userData: {},
  updatedUserData: {},
  registeredUser: {},
  loggedUser: {},
  signedOut: {},
  userToken: {},
  userDataToDisplay: {},
  closeAccount: {},
  passwordCheck: {},
  deleteAccountModal: true,
  savedExchangeRates: {},
  exchangeRatesFromDB: {},

  //TRANACTIONS
  userTransactions: {},
  dashboardData: [],
  addTransaction: {},
  filter: { income: 'income', expense: 'expense' },
  currencyExchangeRate: 1,
  currency: 'BAM',
  groupingVar: 'day',
  updatedUserTransaction: {},
  deleteTransaction: {},
  userTransactionData: {},
  deleteId: '',
  openDeleteModal: false,
  transactionsOverviewLevel: 'Daily',
  //STATISTICS
  filterVarForCharts: '',
  groupingVarForCharts: 'day',
  chartType: 'pie',
  statisticsOverviewLevel: 'Week',
  currencyExchangeRates: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    cleanRegisteredUserData: (state, action) => {
      state.loggedUser = {};
      state.registeredUser = {};
    },

    cleanUpdatedUserData: (state, action) => {
      state.updatedUserData = {};
    },
    cleanPasswordCheckData: (state, action) => {
      state.passwordCheck = {};
    },
    getUserDataToDisplay: (state, action) => {
      state.userData = state.loggedUser.user;
    },
    dashboardData: (state, action) => {
      state.dashboardData = [...state.dashboardData, action.payload];
    },
    cleanTransactionData: (state, action) => {
      state.addTransaction = {};
    },
    cleanTransactionUpdatedData: (state, action) => {
      state.updatedUserTransaction = {};
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCurrencyExchangeRate: (state, action) => {
      state.currencyExchangeRate = action.payload;
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
    cleanDeleteTransactionData: (state, payload) => {
      state.deleteTransaction = {};
    },
    setFilterVarForCharts: (state, action) => {
      state.filterVarForCharts = action.payload;
    },
    setGroupingVarForCharts: (state, action) => {
      state.groupingVarForCharts = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setTransactionsOverviewLevel: (state, action) => {
      state.transactionsOverviewLevel = action.payload;
    },
    setStatisticsOverviewLevel: (state, action) => {
      state.statisticsOverviewLevel = action.payload;
    },
    setDeleteAccountModal: (state, action) => {
      state.deleteAccountModal = action.payload;
    },
    //reset store state after logout or delete of account
    cleanStore: () => initialState,
  },
  extraReducers: {
    [createUser.fulfilled]: (state, { payload }) => {
      return { ...state, registeredUser: payload };
    },
    [signinUser.fulfilled]: (state, { payload }) => {
      return { ...state, loggedUser: payload, userData: payload.user };
    },
    [signoutUser.fulfilled]: (state, { payload }) => {
      return { ...state, signedOut: payload };
    },
    [userToken.fulfilled]: (state, { payload }) => {
      return { ...state, userToken: payload };
    },
    [fetchUserData.fulfilled]: (state, { payload }) => {
      return { ...state, userData: payload };
    },
    [updateUserData.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserData: payload, userDataToDisplay: payload.user };
    },
    [closeAccount.fulfilled]: (state, { payload }) => {
      return { ...state, closeAccount: payload };
    },
    [passwordCheck.fulfilled]: (state, { payload }) => {
      return { ...state, passwordCheck: payload };
    },
    [updateUserPassword.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserData: payload };
    },
    // TRANSACTIONS
    [fetchUserTransactions.fulfilled]: (state, { payload }) => {
      return { ...state, userTransactions: payload };
    },
    [createTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, addTransaction: payload };
    },
    [updateUserTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, updatedUserTransaction: payload };
    },
    [fetchUserTransactionData.fulfilled]: (state, { payload }) => {
      return { ...state, userTransactionData: payload };
    },
    [deleteTransaction.fulfilled]: (state, { payload }) => {
      return { ...state, deleteTransaction: payload };
    },
    [reloginUser.fulfilled]: (state, { payload }) => {
      return { ...state, loggedUser: payload, userDataToDisplay: payload.message };
    },
    [fetchCurrencyExchangeRates.fulfilled]: (state, { payload }) => {
      return { ...state, currencyExchangeRates: payload };
    },
    [saveExchangeRatesInDB.fulfilled]: (state, { payload }) => {
      return { ...state, savedExchangeRates: payload };
    },
    [fetchSavedExchangeRatesFromDB.fulfilled]: (state, { payload }) => {
      return { ...state, exchangeRatesFromDB: payload };
    },
  },
});

export const getUser = (state) => state.users.registeredUser;
export const getUserSigninData = (state) => state.users.loggedUser;
export const getUserToken = (state) => state.users.userToken;
export const getErrors = (state) => state.users.showErrors;
export const getUserData = (state) => state.users.userData;
export const getUpdatedUserData = (state) => state.users.updatedUserData;
export const getCloseAccountData = (state) => state.users.closeAccount;
export const getPasswordCheckData = (state) => state.users.passwordCheck;
export const getUserDataToDisplay = (state) => state.users.userDataToDisplay;
export const getDeleteAccountModal = (state) => state.users.deleteAccountModal;
export const getCurrencyExchangeRates = (state) => state.users.currencyExchangeRates;
///
export const getUserTransactions = (state) => state.users.userTransactions;
export const getDashboardData = (state) => state.users.dashboardData;
export const getTransactionData = (state) => state.users.addTransaction;
export const getFilter = (state) => state.users.filter;
export const getCurrencyExchangeRate = (state) => state.users.currencyExchangeRate;
export const getCurrency = (state) => state.users.currency;
export const getGroupingVar = (state) => state.users.groupingVar;
export const getUpdatedUserTransaction = (state) => state.users.updatedUserTransaction;
export const getUserTransactionData = (state) => state.users.userTransactionData;
export const getDeleteId = (state) => state.users.deleteId;
export const getOpenDeleteModal = (state) => state.users.openDeleteModal;
export const getDeleteAPIMessage = (state) => state.users.deleteTransaction;
export const getTransactionsOverviewLevel = (state) => state.users.transactionsOverviewLevel;

///
export const getFilterVarForCharts = (state) => state.users.filterVarForCharts;
export const getGroupingVarForCharts = (state) => state.users.groupingVarForCharts;
export const getChartType = (state) => state.users.chartType;
export const getStatisticsOverviewLevel = (state) => state.users.statisticsOverviewLevel;
export const getSavedExchangeRates = (state) => state.users.savedExchangeRates;
export const getExchangeRatesFromDB = (state) => state.users.exchangeRatesFromDB;

export const {
  userDataToDisplay,
  cleanRegisteredUserData,
  cleanUpdatedUserData,
  cleanPasswordCheckData,
  dashboardData,
  cleanTransactionData,
  setFilter,
  setCurrency,
  setCurrencyExchangeRate,
  setGroupingVar,
  cleanTransactionUpdatedData,
  setDeleteId,
  setOpenDeleteModal,
  cleanDeleteTransactionData,
  setFilterVarForCharts,
  setGroupingVarForCharts,
  setChartType,
  setTransactionsOverviewLevel,
  setStatisticsOverviewLevel,
  setDeleteAccountModal,
  cleanStore,
  cleanUserData,
} = usersSlice.actions;

export default usersSlice.reducer;
