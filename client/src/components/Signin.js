import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import {
  signinUser,
  getUserSigninData,
  userToken,
  getUserToken,
  fetchUserTransactions,
  userDataToDisplay,
  cleanUserData,
  cleanRegisteredUserData,
} from '../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

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
}));

const Signin = () => {
  const classes = useStyles();
  const userSigninData = useSelector(getUserSigninData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getUserToken);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //if user has token (is logged) redirected to protected page
  useEffect(() => {
    if (userSigninData.hasOwnProperty('token')) {
      dispatch(fetchUserTransactions());
      dispatch(userToken());
      navigate('/dashboard');
    }
  }, [userSigninData]);

  // send request to server to login user and in case there are errors collect error
  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    dispatch(signinUser(user));
  };

  // get values from input fields
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const redirectToSignup = () => {
    dispatch(cleanRegisteredUserData());
    navigate('/signup');
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.tittle}>
          Sign In
        </Typography>

        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
        />
        <br />

        <TextField
          id='password'
          type='password'
          label='Password'
          className={classes.textField}
          value={values.password}
          onChange={handleChange('password')}
          margin='normal'
        />
        <br />
        {
          //display error returned from server
          Object.keys(userSigninData).length !== 0 && (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}></Icon>
              {userSigninData.error}
            </Typography>
          )
        }
      </CardContent>

      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}
        >
          Login
        </Button>
      </CardActions>

      <CardActions>
        <Typography component='p' className={classes.noaccount}>
          No account?
        </Typography>

        <Typography
          component='p'
          color='primary'
          className={classes.signup}
          onClick={redirectToSignup}
        >
          SIGN UP
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Signin;
