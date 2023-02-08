import {
  getUserToken,
  userToken,
  signoutUser,
  fetchUserTransactions,
  setGroupingVarForCharts,
  setGroupingVar,
  setFilterVarForCharts,
  getStatisticsOverviewLevel,
  setTransactionsOverviewLevel,
  setStatisticsOverviewLevel,
} from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, Grid, Typography } from '@material-ui/core';
import Item from '@mui/material/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@material-ui/core';
import LeftPanelStatistics from './LeftPanelStatistics';
import { useEffect, useState } from 'react';
import RightPanelStatistics from './RightPanelStatistics';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Plots from './Charts';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

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
  useEffect(() => {
    //check if user token exists.
    dispatch(userToken());
    dispatch(fetchUserTransactions());
    //In case user tried to visit url /protected without token, redirect
    //to signin page
    if (
      token === 'Request failed with status code 500' ||
      token === 'Request failed with status code 401'
    ) {
      navigate('/');
      window.location.reload();
    }
  }, [token.length, dispatch]);

  const redirectTosignin = () => {
    navigate('/');
    signoutUser();
    //clean store
    window.location.reload();
  };

  const statisticsOverviewLevel = useSelector(getStatisticsOverviewLevel);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElStatistics, setAnchorElStatistics] = useState(null);
  const openStatistics = Boolean(anchorElStatistics);

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
    dispatch(setTransactionsOverviewLevel('Annual'));
    navigate('/transactions');
  };

  //statistics data
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

            <Button
              style={{ textTransform: 'none' }}
              id='demo-customized-button'
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Transactions
            </Button>
            <StyledMenu
              id='demo-customized-menu'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={dailyData} disableRipple>
                Daily
              </MenuItem>

              <MenuItem onClick={weeklyData} disableRipple>
                Weekly
              </MenuItem>

              <MenuItem onClick={monthlyData} disableRipple>
                Monthly
              </MenuItem>

              <MenuItem onClick={annualData} disableRipple>
                Yearly
              </MenuItem>
            </StyledMenu>

            <Button
              style={{ textTransform: 'none' }}
              id='demo-customized-button'
              aria-controls={openStatistics ? 'demo-customized-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openStatistics ? 'true' : undefined}
              disableElevation
              variant='contained'
              onClick={handleClickStatistics}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Statistics
            </Button>
            <StyledMenu
              id='demo-customized'
              MenuListProps={{
                'aria-labelledby': 'demo-customized',
              }}
              anchorEl={anchorElStatistics}
              open={openStatistics}
              onClose={handleCloseStatistics}
            >
              <MenuItem onClick={week} disableRipple>
                Week
              </MenuItem>

              <MenuItem onClick={month} disableRipple>
                Month
              </MenuItem>

              <MenuItem onClick={year} disableRipple>
                Year
              </MenuItem>
            </StyledMenu>
          </ButtonGroup>
          {/* <Typography component={'p'} sx={{fontStyle:"italic"}} >
            {`Overview level: ${statisticsOverviewLevel}`}
        </Typography> */}
        </Box>
      </Grid>

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
    </Grid>
  );
};

export default Statistics;
