import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  signoutUser,
  getUserSigninData,
  cleanStore,
  getUserDataToDisplay,
  reloginUser,
  getUserToken,
  fetchUserTransactionData,
  fetchUserTransactions,
  fetchCurrencyExchangeRates,
  getCurrencyExchangeRates,
  getSavedExchangeRates,
  fetchSavedExchangeRatesFromDB,
  saveExchangeRatesInDB,
  getUserData,
} from '../../features/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ButtonGroup, Divider, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import DropdownMenuButtons from '../utils/DropdownMenuButtons';
import { getUserTransactions } from '../../features/transactionsSlice';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: 'inline',
  },
  title: {
    padding: `${theme.spacing(5)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  dashboardTitle: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771',
    },
  },
  logo: {
    maxWidth: 80,
  },
  rightButtons: {
    backgroundColor: 'white',
    marginRight: '2px',
    marginTop: '50px',
    textTransform: 'none',
    marginLeft: 'auto',
  },
  welcomeMessage: {
    paddingLeft: '20px',
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(getUserDataToDisplay);
  const displayUserName = useSelector(getUserDataToDisplay);
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const loggedUser = useSelector(getUserSigninData);
  const userToken = useSelector(getUserToken);
  const userDisplayData = useSelector(getUserDataToDisplay);
  const currencyExchangeRates = useSelector(getCurrencyExchangeRates);
  const savedExchangeRates = useSelector(getSavedExchangeRates);


  useEffect(() => {
    if (Object.values(loggedUser).length === 0 && userToken?.message && !loggedUser?.error) {
      dispatch(reloginUser(userToken.message));
      dispatch(fetchUserTransactions());
      dispatch(getUserTransactions());
    }

    if (Object.keys(currencyExchangeRates).length === 0) {
      dispatch(fetchCurrencyExchangeRates());
    }
console.log(Object.values(savedExchangeRates).length)
    if(Object.values(currencyExchangeRates).length > 0
    && Object.values(savedExchangeRates).length === 0
    ){
        dispatch(saveExchangeRatesInDB({rates:{
          USD:currencyExchangeRates[0].USD,
          EUR:currencyExchangeRates[0].EUR
        }}))

    }

  }, [loggedUser.user, userToken, userDisplayData, currencyExchangeRates,savedExchangeRates, savedExchangeRates]);

  const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const editProfile = () => {
    navigate(`editProfile/${userData._id}`);
  };

  const editPassword = () => {
    navigate(`/editPassword/${userData._id}`);
  };

  const deleteAccount = () => {
    navigate(`/deleteAccount/${userData._id}`);
  };

  const date = new Date();

  const signout = () => {
    dispatch(signoutUser());
    dispatch(cleanStore());
    navigate('/');
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuButtons = ['Edit Profile', 'Edit Password', 'Delete Account'];
  const menuFunctions = [editProfile, editPassword, deleteAccount];
  return (
    <AppBar position='static'>
      {Object.keys(displayUserName).length !== 0 ? (
        <span
          style={{ display: 'block', marginLeft: '10px' }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Typography component='p' sx={{ display: { xs: 'block', md: 'none' } }}>
            Hello, {displayUserName.firstName}
          </Typography>
          <Typography
            component='p'
            style={{ fontSize: '9px' }}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {dateFormat(date, 'dddd, dd mmmm')}
          </Typography>
        </span>
      ) : null}

      <Toolbar disableGutters>
        <Box
          component='img'
          sx={{
            height:
              window.location.pathname === '/' ||
              window.location.pathname === '/signin' ||
              window.location.pathname === '/signup'
                ? 64
                : 38,
            display: { xs: 'none', md: 'block' },
            marginTop: { xs: '4px' },
            marginBottom: { xs: '4px' },
          }}
          alt='Expense tracker'
          src='https://joyofandroid.com/wp-content/uploads/2019/06/monefy-money-manager-best-android-business-expense-tracker-finance-financial-income-list-add-deduct-minus-computer-smartphone.png'
        />

        <Typography
          variant={
            window.location.pathname === '/' ||
            window.location.pathname === '/signin' ||
            window.location.pathname === '/signup'
              ? 'h4'
              : 'h6'
          }
          className={
            window.location.pathname === '/' ||
            window.location.pathname === '/signin' ||
            window.location.pathname === '/signup'
              ? classes.title
              : classes.dashboardTitle
          }
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          Personal Expense Tracker and Analyst
        </Typography>
        <br />

        {window.location.pathname === '/signup' || window.location.pathname === '/' ? null : (
          <ButtonGroup style={{ marginLeft: 'auto' }}>
            <DropdownMenuButtons
              buttonLabel='Profile'
              handleOpenMenuButtons={handleOpen}
              menuButtons={menuButtons}
              menuFunctions={menuFunctions}
              open={open}
              handleClose={handleClose}
              anchorEl={anchorEl}
            />
            <Button
              variant='primary'
              onClick={signout}
              style={{ textTransform: 'none', color: 'white' }}
            >
              Signout
            </Button>
          </ButtonGroup>
        )}
      </Toolbar>

      {Object.keys(displayUserName).length !== 0 ? (
        <span style={{ marginLeft: '10px' }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant='h6' sx={{ display: { xs: 'none', md: 'block' } }}>
            Hello, {displayUserName.firstName}
          </Typography>
          <Typography
            component='p'
            style={{ fontSize: '10px' }}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            {dateFormat(date, 'dddd, dd mmmm')}
          </Typography>
        </span>
      ) : null}
    </AppBar>
  );
};

export default Header;
