import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//obtain currency exchange rate
export const fetchCurrencyExchangeRates = createAsyncThunk(
  'exchangeRates/currencyExchangeRates',
  async () => {
    const requests = [
      'https://api.api-ninjas.com/v1/convertcurrency?want=USD&have=BAM&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=BAM&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=BAM&have=USD&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=EUR&have=USD&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=BAM&have=EUR&amount=1',
      'https://api.api-ninjas.com/v1/convertcurrency?want=USD&have=EUR&amount=1',
    ]
    ;

    return await axios
      .all([
      axios.get(requests[0]), 
      axios.get(requests[1]), 
      axios.get(requests[2]), 
      axios.get(requests[3]), 
      axios.get(requests[4]), 
      axios.get(requests[5])])
      .then(
        axios.spread((res1, res2, res3, res4, res5, res6) => 
        [
          { USD: res1.data.new_amount, EUR: res2.data.new_amount },
          { BAM: res3.data.new_amount, EUR: res4.data.new_amount },
          { BAM: res5.data.new_amount, USD: res6.data.new_amount }
        ]
        ),
      )
      .catch((error) => error);
  },
);

export const saveExchangeRatesInDB = createAsyncThunk(
  'exchangeRates/saveExchangeRatesInDB',
  async (exchangeRates) => {
    return await axios
      .post('/api/exchangeRates', exchangeRates)
      .then((res) => res.data)
      .catch((error) => error);
  },
);


const initialState = {
  currencyExchangeRates: {},
  savedExchangeRates: {},
  selectedExchangeRate: 1,
};

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState,
  reducers: {
    setSelectedExchangeRate: (state, action) => {
      state.selectedExchangeRate = action.payload;
    },
  },
  extraReducers: {
    [fetchCurrencyExchangeRates.pending]: (state, { payload }) => {
      return {
        ...state,
        currencyExchangeRates: {
          loading: true,
          success: false,
          error: false,
          data: payload,
        },
      };
    },
    [fetchCurrencyExchangeRates.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currencyExchangeRates: {
          loading: false,
          success: true,
          error: false,
          data: payload,
        },
      };
    },
    [fetchCurrencyExchangeRates.rejected]: (state, { payload }) => {
      return {
        ...state,
        currencyExchangeRates: {
          loading: false,
          success: false,
          error: true,
          data: payload,
        },
      };
    },
  },
  [saveExchangeRatesInDB.pending]: (state, { payload }) => {
    return {
      ...state,
      savedExchangeRates: {
        loading: false,
        success: false,
        error: true,
        data: payload,
      },
    };
  },
  [saveExchangeRatesInDB.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      savedExchangeRates: {
        loading: false,
        success: true,
        error: false,
        data: payload,
      },
    };
  },
  [saveExchangeRatesInDB.rejected]: (state, { payload }) => {
    return {
      ...state,
      savedExchangeRates: {
        loading: false,
        success: false,
        error: true,
        data: payload,
      },
    };
  },
})

export const getCurrencyExchangeRates = (state) => state.exchangeRates.currencyExchangeRates;
export const getSavedExchangeRates = (state) => state.exchangeRates.savedExchangeRates;
export const getSelectedExchangeRate = (state) => state.exchangeRates.selectedExchangeRate;
export const { setSelectedExchangeRate } = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
