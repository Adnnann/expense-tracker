import {
  getUserToken,
  userToken,
  signoutUser,
 
} from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import LeftPanelTransactions from './LeftPanelTransactions';
import { useEffect, useState } from 'react';
import RightPanelTransactions from './RightPanelTransactions';
import Menu from '@mui/material/Menu';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import { getDeleteId, 
  getTransactionsOverviewLevel, 
  getOpenDeleteModal, 
  getFilter,
  setGroupingVar,
  getGroupingVar,
  setFilter,
setTransactionsOverviewLevel,
setOpenDeleteModal } from '../../features/transactionsSlice';
import { useDeleteTransactionMutation, useFetchUserTransactionsQuery } from '../../features/transactionsAPI';
import { getSelectedExchangeRate, setSelectedExchangeRate } from '../../features/exchangeRatesSlice';
import { intToString } from '../utils/functions/helper-functions';
import { 
  setStatisticsOverviewLevel,  
  setGroupingVarForCharts, 
  setFilterVarForCharts,
} from '../../features/statisticsSlice';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  noaccount: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: '0',
  },
  signup: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    textTransform: 'none',
    borderStyle: 'solid',
    borderRightColor: 'black',
    marginRight: '10px',
  },
  sideButtons: {
    borderStyle: 'solid',
    borderColor: 'black',
    marginLeft: 'auto',
    borderRadius: 0,
    minWidth: 120,
    borderBottom: 'solid',
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  cancel: {
    marginLeft: '10px',
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
}));
const Transactions = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  //token id will be sent to dispatcher to make delete request
  const transactionId = useSelector(getDeleteId);
  const selectedCurrencyRate = useSelector(getSelectedExchangeRate);
  const [deleteTransaction, result] = useDeleteTransactionMutation();
  
  useEffect(() => {

  }, [token.length]);

  const redirectTosignin = () => {
    navigate('/');
    signoutUser();
  };

  const filter = useSelector(getFilter);
  const groupingVar = useSelector(getGroupingVar);
  const transactionsOverviewLevel = useSelector(getTransactionsOverviewLevel);
  const IDOfTransactionToDelete = useSelector(getDeleteId);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElStatistics, setAnchorElStatistics] = useState(null);
  const openStatistics = Boolean(anchorElStatistics);
  const {
    data: userTransactions,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useFetchUserTransactionsQuery()

  const openDeleteModal = useSelector(getOpenDeleteModal);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseStatistics = () => {
    setAnchorElStatistics(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickStatistics = (event) => {
    setAnchorElStatistics(event.currentTarget);
  };

  //set filter based on user input
  const dailyData = () => {
    dispatch(setGroupingVar('day'));
    dispatch(setTransactionsOverviewLevel('Daily'));
  };

  const weeklyData = () => {
    dispatch(setGroupingVar('week'));
    dispatch(setTransactionsOverviewLevel('Weekly'));
  };

  const monthlyData = () => {
    dispatch(setGroupingVar('month'));
    dispatch(setTransactionsOverviewLevel('Monthly'));
  };

  const annualData = () => {
    dispatch(setGroupingVar('year'));
    dispatch(setTransactionsOverviewLevel('Annual'));
  };

  //statistics

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

  //modal window confirmation to delete transaction
  const confirmDeleteOfTransaction = () => {
    deleteTransaction(transactionId);
    dispatch(setOpenDeleteModal(false));
  };

  const cancelDeleteOfTransaction = () => {
    dispatch(setOpenDeleteModal(false));
  };
  const menuButtons = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <>
      <Grid container>
        <Grid container item xs={12} md={12} lg={12} xl={12}>
          {/* Left side menu buttons */}
          <ButtonGroup
            style={{
              marginTop: '4%',
              marginBottom: '2%',
              marginLeft: '4%',
              borderBottomStyle: 'solid',
            }}
          >
            <Button className={classes.buttonGroup} onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>

            <>
              <DropdownMenuButtons
                menuButtons={menuButtons}
                buttonLabel='Transactions'
                handleOpenMenuButtons={handleOpen}
                menuFunctions={[dailyData, weeklyData, monthlyData, annualData]}
                open={open}
                handleClose={handleClose}
                anchorEl={anchorEl}
              />
            </>

            <>
              <DropdownMenuButtons
                menuButtons={['Week', 'Month', 'Year']}
                buttonLabel='Statistics'
                open={openStatistics}
                handleOpenMenuButtons={handleClickStatistics}
                menuFunctions={[week, month, year]}
                handleClose={handleCloseStatistics}
                anchorEl={anchorElStatistics}
              />
            </>
          </ButtonGroup>

          <Button
            variant='contained'
            color='primary'
            style={{
              marginLeft: 'auto',
              minWidth: '120px',
              maxHeight: '50px',
              marginRight: '10%',
              marginTop: '4%',
            }}
            onClick={() => navigate('/transactions/addNewIncome')}
          >
            ADD
          </Button>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12}>
          <p style={{ marginLeft: '10%' }}>{transactionsOverviewLevel}</p>
        </Grid>

        <Grid item xs={8} md={2} lg={2} xl={2}>
          <Box
            sx={{
              display: 'flex',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup
              style={{ marginLeft: 'auto' }}
              orientation='vertical'
              aria-label='vertical contained button group'
              variant='text'
              style={{
                borderBottom: 'solid',
                borderTop: 'solid',
                borderRadius: '0',
                borderBottomWidth: '0px',
                marginLeft: 'auto',
              }}
            >
              <Button
                key='one'
                className={classes.sideButtons}
                style={{ borderBottom: 'solid' }}
                onClick={() => dispatch(setFilter({ income: 'income', expense: 'expense' }))}
              >
                ALL
              </Button>
              <Button
                key='two'
                className={classes.sideButtons}
                onClick={() => dispatch(setFilter({ income: 'income', expense: '' }))}
              >
                INCOME
              </Button>
              <Button
                key='three'
                className={classes.sideButtons}
                onClick={() => dispatch(setFilter({ income: '', expense: 'expense' }))}
              >
                EXPENSE
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>

        <Grid item xs={12} md={2} lg={2} xl={2}>
          <LeftPanelTransactions />
        </Grid>

        <Grid item xs={12} md={8} lg={7} xl={7}>
        {isLoading && <p>Loading...</p>}
        {isSuccess && userTransactions.length > 0 && (
          <RightPanelTransactions
          data={userTransactions}
          intToString={intToString}
          currencyRate={selectedCurrencyRate}
          filter={filter}
          groupingVar={groupingVar} />)}
        </Grid>
      </Grid>

      <Dialog open={openDeleteModal} fullWidth>
        <DialogTitle style={{ margin: '0 auto' }}>DELETE TRANSACTION</DialogTitle>
        <DialogTitle style={{ margin: '0 auto', color: 'grey' }}>
          Are you sure you want to delete?
        </DialogTitle>

        <DialogActions>
          <div style={{ margin: '0 auto' }}>
            <Button
              color='primary'
              variant='contained'
              onClick={() => confirmDeleteOfTransaction()}
              className={classes.save}
            >
              OK
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={() => cancelDeleteOfTransaction()}
              className={classes.cancel}
            >
              Cancel
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={false}>
        <DialogTitle>Session expired</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have been logged out due to inactivity.
            <br />
            Please signin again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' autoFocus='autoFocus' onClick={redirectTosignin}>
            Signin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Transactions;
