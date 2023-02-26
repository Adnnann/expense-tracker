import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@material-ui/core/Typography';
import { Box } from '@mui/material';
import DonutChart from '../dashboard/DonutChart';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getGroupingVar } from '../../features/transactionsSlice';
import {
  getCurrencyExchangeRates,
  getSelectedExchangeRate,
  setSelectedExchangeRate,
} from '../../features/exchangeRatesSlice';
import SelectCurrency from '../dashboard/SelectCurrency';
import { calculateIncomesAndExpenses } from '../utils/functions/helper-functions';
import { calculateTotal } from '../utils/functions/helper-functions';
import { useFetchUserTransactionsQuery } from '../../features/transactionsAPI';
const LeftPanelTransactions = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('BAM');
  const EURandUSDExchangeRates = useSelector(getCurrencyExchangeRates);
  const selectedCurrencyRate = useSelector(getSelectedExchangeRate);
  const groupingVar = useSelector(getGroupingVar);
  const [skip, setSkip] = useState(true);

  const {
    data: userTransactions,
    isSuccess,
  } = useFetchUserTransactionsQuery({
    skip: skip,
  });

  //based on user selection of currency use appropriate coeficients to show all data in differenct currencies. Default values is BAM, hence multiple by one.
  const handleChange = (event) => {
    switch (event.target.value) {
      case 'BAM':
        dispatch(setSelectedExchangeRate(1));
        break;
      case 'USD':
        dispatch(setSelectedExchangeRate(EURandUSDExchangeRates.data[0].USD));
        break;
      case 'EUR':
        dispatch(setSelectedExchangeRate(EURandUSDExchangeRates.data[0].EUR));
        break;
    }
  };

 
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        component='p'
        style={{
          textAlign: 'center',
          color: 'black',
        }}
      >
        <span style={{ color: 'black', fontWeight: 'bold' }}>Total Balance </span>
        <br />
        {isSuccess &&
          userTransactions.length > 0 &&
          calculateTotal(userTransactions, groupingVar, selectedCurrencyRate)}
      </Typography>

      <span>
        <div style={{ display: 'inline-flex', marginBottom: '5px' }}>
          <FormControl>
            <SelectCurrency
              options={['BAM', 'USD', 'EUR']}
              currency={selectedValue}
              handleChange={handleChange}
            />
          </FormControl>
        </div>
      </span>

      {isSuccess && userTransactions.length > 0 ? (
        <DonutChart
          income={calculateIncomesAndExpenses(userTransactions, 'income', groupingVar)}
          expense={calculateIncomesAndExpenses(userTransactions, 'expense', groupingVar)}
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default LeftPanelTransactions;
