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
  
} from '../../features/statisticsSlice';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import {
  getCurrencyExchangeRates,
  getSelectedExchangeRate,
  setSelectedExchangeRate,  
} from '../../features/exchangeRatesSlice';
import { 
  getFilter, 
  setTransactionsOverviewLevel,
  
  setGroupingVar,
} from '../../features/transactionsSlice';
import LeftSidePanelData from './LeftSidePanelData';
import SelectCurrency from './SelectCurrency';
import { 
  calculateIncomesAndExpenses, calculateTotal 
} from '../utils/functions/helper-functions';
import { useFetchUserTransactionsQuery } from '../../features/transactionsAPI';



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

  const selectedExchangeRate = useSelector(getSelectedExchangeRate);
  const { data } = useSelector(getCurrencyExchangeRates);
  //manage dropdown menus in selection panel for transactions
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //DODATI LOADER I ERROR HANDLING
  const {
    data:userTransactions,
    isSuccess, 
    isError, 
   isFetching,
  error} = useFetchUserTransactionsQuery()

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
      
      {isSuccess && userTransactions.length > 0 && (
        <>
          <Typography variant='h6' style={{ marginBottom: '0' }}>
            Total Balance
          </Typography>

          <span>
           
              <SelectCurrency
                options={options}
                currency={selectedValue}
                handleChange={handleChange}
              />
         
            
          </span>
          
         
        <LeftSidePanelData
            totalBalance={calculateTotal(userTransactions, null, selectedExchangeRate)}
          />
    
        <PieChart
            //group and summarize data to get expenses and incomes
          income={calculateIncomesAndExpenses(userTransactions, 'income', null, selectedExchangeRate)}
          expense={calculateIncomesAndExpenses(userTransactions, 'expense', null, selectedExchangeRate)}
          /> 
    
        {/*instruct user to go to tab transactions to start adding incomes and expenses in order to get the report*/}
        <Typography component='p' style={{ textAlign: 'center', fontStyle: 'italic' }}>
          Click on the tab transactions and start adding incomes or expenses to generate dashboard
          data
        </Typography>

        </>
        
        )}
     
    </Box>
  );
};

export default LeftSideDashboard;
