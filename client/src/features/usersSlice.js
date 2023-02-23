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

export const reloginUser = createAsyncThunk('users/loggedUser', async (id) => {
  return await axios
    .post(`/api/users/relogin`, { token: id })
    .then((response) => response.data)
    .catch((error) => error);
});

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
  dashboardData: [],
  userDataToDisplay: {},
  //TRANACTIONS

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
    dashboardData: (state, action) => {
      state.dashboardData = [...state.dashboardData, action.payload];
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setCurrencyExchangeRate: (state, action) => {
      state.currencyExchangeRate = action.payload;
    },
    setUserDataToDisplay: (state, action) => {
      state.userDataToDisplay = action.payload;
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
    [reloginUser.fulfilled]: (state, { payload }) => {
      return { ...state, loggedUser: payload, userDataToDisplay: payload.message };
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

export const getCurrency = (state) => state.users.currency;

///

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
  setUserDataToDisplay,
} = usersSlice.actions;

export default usersSlice.reducer;
