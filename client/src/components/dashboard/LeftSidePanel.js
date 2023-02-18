import { Box } from '@mui/material';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Divider, makeStyles } from '@material-ui/core';
import PieChart from './PieChart';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterVarForCharts,
  setGroupingVarForCharts,
  setStatisticsOverviewLevel,
  setGroupingVar,
  
} from '../../features/usersSlice';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import {
  getCurrencyExchangeRates,
  getSelectedExchangeRate,
  setSelectedExchangeRate,
  
} from '../../features/exchangeRatesSlice';
import { 
  getUserTransactions,
  getFilter, 
  setTransactionsOverviewLevel,
} from '../../features/transactionsSlice';
import LeftSidePanelData from './LeftSidePanelData';
import SelectCurrency from './SelectCurrency';
import { 
  calculateIncomesAndExpenses 
} from '../utils/functions/HelperFunctions';



const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    textTransform: 'none',
    borderStyle: 'solid',
    borderRightColor: 'black',
    marginRight: '10px',
  },
}));

const LeftSideDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filter = useSelector(getFilter);

  const { loading, success, error, data } = useSelector(getCurrencyExchangeRates);
  const transactions = useSelector(getUserTransactions);
  const selectedExchangeRate = useSelector(getSelectedExchangeRate);
  //manage dropdown menus in selection panel for transactions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //manage dropdown menus in selection panel for statistical overview
  const [anchorElStatistics, setAnchorElStatistics] = useState(null);
  const openStatistics = Boolean(anchorElStatistics);

  const [selectedValue, setSelectedValue] = useState('BAM');

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseStatistics = () => {
    setAnchorElStatistics(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickStatistics = (event) => {
    setAnchorElStatistics(event.currentTarget);
  };

  //set currency coeficient based on user input
  const handleChange = (event) => {
    const { EUR, USD } = data[0];

    switch (event.target.value) {
      case 'BAM':
        dispatch(setSelectedExchangeRate(1));
        break;
      case 'USD':
        dispatch(setSelectedExchangeRate(USD));
        break;
      case 'EUR':
        dispatch(setSelectedExchangeRate(EUR));
        break;
    }
  };

  //present data in more professional way without too many numbers
  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
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

  //navigate to transactions and group and filter data in accordance with user input
  const dailyData = () => {
    dispatch(setGroupingVar('day'));
    dispatch(setTransactionsOverviewLevel('Daily'));
    navigate('/transactions');
  };

  const weeklyData = () => {
    dispatch(setGroupingVar('week'));
    dispatch(setTransactionsOverviewLevel('Weekly'));
    navigate('/transactions');
  };

  const monthlyData = () => {
    dispatch(setGroupingVar('month'));
    dispatch(setTransactionsOverviewLevel('Monthly'));
    navigate('/transactions');
  };

  const annualData = () => {
    dispatch(setGroupingVar('year'));
    dispatch(setTransactionsOverviewLevel('Annualy'));
    navigate('/transactions');
  };

  //navigate to statistics and group and filter data in accordance with user input
  const week = () => {
    dispatch(setFilterVarForCharts('week'));
    dispatch(setGroupingVarForCharts('day'));
    dispatch(setStatisticsOverviewLevel('Week'));
    navigate('/statistics');
  };

  const month = () => {
    dispatch(setFilterVarForCharts('month'));
    dispatch(setGroupingVarForCharts('week'));
    dispatch(setStatisticsOverviewLevel('Month'));
    navigate('/statistics');
  };

  const year = () => {
    dispatch(setFilterVarForCharts('year'));
    dispatch(setGroupingVarForCharts('month'));
    dispatch(setStatisticsOverviewLevel('Year'));
    navigate('/statistics');
  };

  const menuButtons = ['Daily', 'Weekly', 'Monthly', 'Annualy'];
  const options = ['BAM', 'USD', 'EUR'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <>
        <ButtonGroup style={{ marginTop: '10%', borderBottomStyle: 'solid' }}>
          <Button variant='contained' className={classes.buttonGroup}>
            Dashboard
          </Button>

          {
            //menu for transactions
          }

          <DropdownMenuButtons
            buttonLabel={'Transactions'}
            handleOpenMenuButtons={handleClick}
            handleCloseMenuButtons={handleClose}
            openMenuButtons={open}
            handleClose={handleClose}
            anchorEl={anchorEl}
            menuButtons={menuButtons}
            menuFunctions={[dailyData, weeklyData, monthlyData, annualData]}
          />
          {
            //menu for statistics
          }
          <DropdownMenuButtons
            buttonLabel={'Statistics'}
            handleOpenMenuButtons={handleClickStatistics}
            menuButtons={['Week', 'Month', 'Year']}
            menuFunctions={[week, month, year]}
            open={openStatistics}
            handleClose={handleCloseStatistics}
            anchorEl={anchorElStatistics}
          />
        </ButtonGroup>
      </>
      {transactions.success && transactions.data.length > 0 && (
        <>
          <Typography variant='h6' style={{ marginBottom: '0' }}>
            Total Balance
          </Typography>

          <span>
            {transactions.success && transactions.data.length > 0 && (
              <SelectCurrency
                options={options}
                currency={selectedValue}
                handleChange={handleChange}
              />
            )}
            <LeftSidePanelData
              data={transactions.data}
              intToString={intToString}
              selectedExchangeRate={selectedExchangeRate}
            />
          </span>

          <PieChart
            //group and summarize data to get expenses and incomes
            income={calculateIncomesAndExpenses(transactions.data, 'income', null)}
            expense={
              calculateIncomesAndExpenses(transactions.data, 'expense', null)
              // _.chain(transactions.data.filter((item) => item.type === 'expense'))
              //   .groupBy('type')
              //   .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              //   .value().expense
              //   ? (
              //       _.chain(transactions.data.filter((item) => item.type === 'expense'))
              //         .groupBy('type')
              //         .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              //         .value().expense * selectedExchangeRate
              //     ).toFixed(2)
              //   : ''
            }
          />
        </>
      )}

      {success && data.length === 0 && (
        //instruct user to go to tab transactions to start adding incomes and expenses in order to get the report
        <Typography component='p' style={{ textAlign: 'center', fontStyle: 'italic' }}>
          Click on the tab transactions and start adding incomes or expenses to generate dashboard
          data
        </Typography>
      )}
    </Box>
  );
};

export default LeftSideDashboard;
