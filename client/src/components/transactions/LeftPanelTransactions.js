import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Typography from '@material-ui/core/Typography';
import { Box } from '@mui/material';
import DonutChart from '../dashboard/DonutChart';
import { getGroupingVar } from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getUserTransactions } from '../../features/transactionsSlice';
import {
  getCurrencyExchangeRates,
  setSelectedExchangeRate,
} from '../../features/exchangeRatesSlice';
import SelectCurrency from '../dashboard/SelectCurrency';
import { calculateIncomesAndExpenses } from '../utils/functions/HelperFunctions';
const LeftPanelTransactions = () => {
  const dispatch = useDispatch();
  const userTransactions = useSelector(getUserTransactions);
  const [selectedValue, setSelectedValue] = useState('BAM');
  const EURandUSDExchangeRates = useSelector(getCurrencyExchangeRates);

  const groupingVar = useSelector(getGroupingVar);

  const intToString = (num) => {
    if (num < 0) {
      num = `-${num.toString().replace(/[^0-9.]/g, '')}`;
    } else {
      num = num.toString().replace(/[^0-9.]/g, '');
    }

    if (num > 0 && num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }

    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
  };
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

        {userTransactions.success && userTransactions.data.length !== 0
          ? intToString(
              calculateIncomesAndExpenses(userTransactions.data, 'income', groupingVar) -
                calculateIncomesAndExpenses(userTransactions.data, 'expense', groupingVar),
            )
          : null}
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

      {userTransactions.success && userTransactions.data.length !== 0 ? (
        <DonutChart
          income={calculateIncomesAndExpenses(userTransactions.data, 'income', groupingVar)}
          expense={calculateIncomesAndExpenses(userTransactions.data, 'expense', groupingVar)}
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default LeftPanelTransactions;
