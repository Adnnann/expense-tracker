import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  createUser,
  cleanRegisteredUserData,
  getCloseAccountData,
  cleanStore,
} from '../features/usersSlice';
import { useNavigate } from 'react-router';
import TextFields from '../components/utils/TextFieldsGenerator';
import { useSignUpGoogleUserMutation, useSignUpUserMutation } from '../features/userAPI';

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
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
}));
const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(getUser);
  const navigate = useNavigate();
  const closeAccountData = useSelector(getCloseAccountData);
  const [successModalWindow, setSuccessModalWindow] = useState(false);

  const [signUpUser, result] = useSignUpUserMutation();

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    password: '',
    email: '',
    confirmationPassword: '',
    open: false,
    error: '',
  });

  useEffect(() => {
    if(result.isSuccess){
      setValues({ ...values, error: '', open: true });
      setSuccessModalWindow(true);
    } 
  }, [result]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      confirmationPassword: values.confirmationPassword || undefined,
    };

    if (!values.confirmationPassword || values.confirmationPassword === '') {
      setValues({ ...values, error: 'Please repeat your password' });
      return;
    } else if (values.password !== values.confirmationPassword) {
      setValues({ ...values, error: 'Password do not match' });
      return;
    } else {
      setValues({ ...values, error: '' });
    }

    signUpUser(user);

  };
  const redirectToSignin = () => {
    navigate('/');
    dispatch(cleanRegisteredUserData());
  };

  const fields = ['firstName', 'lastName', 'email', 'password','confirmationPassword'];
  const textFieldValues = [values.firstName, values.lastName, values.email, values.password, values.confirmationPassword];
  const changeHandler = [handleChange('firstName'), handleChange('lastName'), handleChange('email'), handleChange('password'), handleChange('confirmationPassword')];
  const labels = ['First Name', 'Last Name', 'Email', 'Password','Repeat Password'];
  const id = ['firstName', 'lastName', 'email', 'password','password'];
  const buttonClasses = Array(5).fill(classes.textField);
  const types = ['text', 'text', 'email', 'password','password']

console.log(result)
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6' className={classes.tittle}>
            Sign Up
          </Typography>

          <TextFields
            fields={fields}
            values={textFieldValues}
            changeHandler={changeHandler}
            labels={labels}
            id={id}
            buttonClasses={buttonClasses}
            types={types}
          />
            
            
          <br />

          {values.error ? (
            <Typography component='p' color='error'>
              <Icon color='error' className={classes.error}></Icon>
              {values.error}
            </Typography>
          ) : (
            result.isError && (
              <Typography component='p' color='error'>
                <Icon color='error' className={classes.error}></Icon>
                {result.error.data}
              </Typography>
            )
          )}
        </CardContent>

        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>

        <CardActions>
          <Typography component='p' className={classes.hasAccount}>
            Already have an account?
          </Typography>

          <Typography
            component='p'
            color='primary'
            className={classes.signin}
            onClick={redirectToSignin}
          >
            LOGIN
          </Typography>
        </CardActions>
      </Card>

      <Dialog open={successModalWindow ? true : false}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>New account successfuly created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' autoFocus='autoFocus' onClick={redirectToSignin}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
