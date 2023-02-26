import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Icon, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import jwtDecode from 'jwt-decode';
import { Typography } from '@material-ui/core';
import date from 'date-and-time';
import { DateTime } from 'luxon';
import { useCreateTransactionMutation } from '../../features/services/transactionsAPI';
import { getCurrencyExchangeRates } from '../../features/exchangeRatesSlice';

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
    fontSize: '18px',
  },
  tittle: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textFieldTitle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    borderBottomWidth: '1.2px',
    borderBottomColor: 'green',
    borderBottomStyle: 'solid',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  textFieldAmount: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    width: 200,
    borderBottomWidth: '1.2px',
    borderBottomColor: 'green',
    borderBottomStyle: 'solid',
    paddingTop: 13,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  hasAccount: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: '0',
  },
  signin: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
  buttonGroup: {
    textTransform: 'none',
    borderStyle: 'solid',
    borderRightColor: 'black',
    marginRight: '10px',
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
  currency: {
    borderBottomColor: 'green',
    borderBottomStyle: 'solid',
    borderWidth: '1px',
  },
}));
const AddNewIncome = () => {
  const currencyRates = useSelector(getCurrencyExchangeRates)
  const [addTransaction, result] = useCreateTransactionMutation();

  const classes = useStyles();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('BAM');
  const [values, setValues] = useState({
    title: '',
    amount: 0,
    currency: '',
    valueInBAM: '',
    valueInUSD: '',
    valueInEUR: '',
    open: false,
    error: '',
  });

  useEffect(() => {
    if (result.isSuccess) {
      navigate('/transactions');
    }
  }, [result]);

  const handleChange = (name) => (event) => {

  if(name === 'amount'){
    if(String(event.target.value).charAt(0) === "0"){
      setValues({ ...values, [name]: event.target.value, error:'Number cannot start with 0!' });
    }else if(event.target.value.match(/^[0-9]+$/)){
      setValues({ ...values, [name]: Number(event.target.value), error:'' })
    }else if(!event.target.value.match(/^[0-9]+$/) && event.target.value !== ''){
      setValues({ ...values, [name]: event.target.value, error:'Please enter a valid number' });
    }else{
      setValues({ ...values, [name]: event.target.value, error:'' });
    }
  }else{
    if(event.target.value.charAt(0).match(/^[0-9]+$/)){
      setValues({ ...values, [name]: event.target.value, error:'Transaction name cannot start with number' });
    }else if(event.target.value.length < 5){
      setValues({ ...values, [name]: event.target.value, error:'Transaction name must be at least 5 characters long' });
    }else{
      setValues({ ...values, [name]: event.target.value, error:'' });
    }
}
};
  const currencyHandleChange = (event) => {
    setCurrency(event.target.value);
  };

  const clickSubmit = () => {

    let income = {
      title: values.title,
      amount: values.amount,
      day: date.format(new Date(), 'dddd'),
      week: 'Week ' + DateTime.now().weekNumber,
      month: date.format(new Date(), 'MMM'),
      year: date.format(new Date(), 'YYYY'),
      currency: currency || undefined,
      amountInBAM:0,
      amountInEUR:0,
      amountInUSD: 0,
      type: 'income',
    };

    //based on user currency input calculate all values in remaning two currencies
    switch (currency) {
      case 'BAM':
        income.amountInBAM = Number(income.amount) || undefined
        income.amountInUSD= Number(income.amount * currencyRates.data[0].USD) || undefined
        income.amountInEUR= Number(income.amount * currencyRates.data[0].EUR) || undefined
      break;
      case 'USD':
        income.amountInBAM = Number(income.amount * currencyRates.data[1].BAM) || undefined
        income.amountInUSD = Number(income.amount)
        income.amountInEUR = Number(income.amount * currencyRates.data[1].EUR) || undefined
      break;
      case 'EUR':
        income.amountInBAM = Number(income.amount * currencyRates.data[2].BAM) || undefined
        income.amountInUSD = Number(income.amount * currencyRates.data[2].USD) || undefined
        income.amountInEUR = Number(income.amount)
      break;
    }
    //use mutation to add new income
    addTransaction(income);

  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <CardActions>
          <div style={{ margin: '0 auto' }}>
            <ButtonGroup
              style={{ marginTop: '10%', borderBottomStyle: 'solid', borderRadius: '0' }}
            >
              <Button
                variant='contained'
                className={classes.buttonGroup}
                style={{
                  borderRightStyle: 'solid',
                  borderRightColor: 'black',
                  borderRightWidth: '1px',
                  borderRadius: '0px',
                }}
                onClick={() => navigate('/transactions/addNewIncome')}
              >
                Income
              </Button>

              <Button
                className={classes.buttonGroup}
                onClick={() => navigate('/transactions/addNewExpense')}
              >
                Income
              </Button>
            </ButtonGroup>
          </div>
        </CardActions>

        <TextField
          id='title'
          placeholder='Title*'
          className={classes.textFieldTitle}
          onChange={handleChange('title')}
          margin='dense'
        />
        <br />

        <>
          <TextField
            id='amount'
            placeholder='Amount'
            className={classes.textFieldAmount}
            onChange={handleChange('amount')}
            margin='dense'
          />
        </>

        {
          //display error returned from server
          result.isError && (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}></Icon>
              {result.error.data}
            </Typography>
          )
        }
        {
          //display error returned from server
          values.error !== '' && (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}></Icon>
              {values.error}
            </Typography>
          )
        }
        <span>
          <div style={{ display: 'inline-flex', padding: '0', marginLeft: '15px' }}>
            <FormControl>
              <InputLabel variant='standard' htmlFor='currency'>
                Currency
              </InputLabel>
              <NativeSelect
                className={classes.currency}
                margin='dense'
                variant='filled'
                value={currency}
                onChange={currencyHandleChange}
                inputProps={{
                  name: 'currency',
                  id: 'currency',
                }}
              >
                <option value={'BAM'}>BAM</option>
                <option value={'USD'}>$</option>
                <option value={'EUR'}>€</option>
              </NativeSelect>
            </FormControl>
          </div>
        </span>
        <br />
      </CardContent>

      <CardActions>
        <div style={{ margin: '0 auto' }}>
          <Button
            color='primary'
            variant='contained'
            onClick={clickSubmit}
            className={classes.save}
          >
            Save
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={() => navigate('/transactions')}
            className={classes.cancel}
          >
            Cancel
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default AddNewIncome;
