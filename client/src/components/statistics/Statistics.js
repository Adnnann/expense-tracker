import {
  getUserToken,
  userToken,
  signoutUser,
} from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@material-ui/core';
import LeftPanelStatistics from './LeftPanelStatistics';
import { useEffect, useState } from 'react';
import RightPanelStatistics from './RightPanelStatistics';
import Plots from './Charts';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import { 
  setStatisticsOverviewLevel, 
  setGroupingVarForCharts,
  setGroupingVar,
  setFilterVarForCharts
} from '../../features/statisticsSlice';
import { setTransactionsOverviewLevel } from '../../features/transactionsSlice';
import { useFetchUserTransactionsQuery } from '../../features/transactionsAPI';
const useStyles = makeStyles((theme) => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderStyle: 'none',
  },
  buttonGroup: {
    textTransform: 'none',
    borderStyle: 'solid',
    borderRightColor: 'black',
    marginRight: '10px',
  },
}));
const Statistics = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const [skip, setSkip] = useState(false);

  const {
    data: userTransactions,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useFetchUserTransactionsQuery( undefined, {
    skip: skip,
  });


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElStatistics, setAnchorElStatistics] = useState(null);
  const openStatistics = Boolean(anchorElStatistics);

  useEffect(() => {
    if (error?.data) {
      navigate('/');
    }
  }, [error]);

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

  const dashboard = () => {
    navigate('/dashboard');
  };

  //set filter based on user input
  
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
    dispatch(setTransactionsOverviewLevel('Annual'));
    navigate('/transactions');
  };

  //statistics data
  const week = () => {
    dispatch(setGroupingVarForCharts('week'));
    dispatch(setStatisticsOverviewLevel('Week'));
    navigate('/statistics');
  };

  const month = () => {
    dispatch(setGroupingVarForCharts('month'));
    dispatch(setStatisticsOverviewLevel('Month'));
    navigate('/statistics');
  };

  const year = () => {
    dispatch(setGroupingVarForCharts('year'));
    dispatch(setStatisticsOverviewLevel('Year'));
    navigate('/statistics');
  };

  const buttons = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={4} lg={4} xl={4}>
        {/* Left side menu buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            fontStyle: 'italic',
            marginBottom: '50px',
          }}
        >
          <ButtonGroup sx={{ marginTop: '5px', borderBottomStyle: 'solid' }}>
            <Button className={classes.buttonGroup} onClick={dashboard}>
              Dashboard
            </Button>

            <DropdownMenuButtons
              buttonLabel='Transactions'
              handleOpenMenuButtons={handleClick}
              menuButtons={buttons}
              menuFunctions={[weeklyData, monthlyData, annualData]}
              open={open}
              handleClose={handleClose}
              anchorEl={anchorEl}
            />

            <DropdownMenuButtons
              buttonLabel='Statistics'
              handleOpenMenuButtons={handleClickStatistics}
              menuButtons={['Week', 'Month', 'Year']}
              menuFunctions={[week, month, year]}
              open={openStatistics}
              handleClose={handleCloseStatistics}
              anchorEl={anchorElStatistics}
            />
          </ButtonGroup>
        </Box>
      </Grid>
      {isSuccess && userTransactions.length > 0 && (
     <>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <LeftPanelStatistics />
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          fontStyle: 'italic',
          marginTop: '20px',
        }}
      >
        <Plots />
      </Box>

      <Grid item xs={12} md={9} lg={9} xl={12}>
        <RightPanelStatistics />
      </Grid>
      </>
      )}
    </Grid>
  );
};

export default Statistics;
