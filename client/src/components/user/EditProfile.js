import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserData,
  updateUserData,
  getUpdatedUserData,
  getUserData,
  userDataToDisplay,
  cleanUpdatedUserData,
  userToken,
  getUserToken,
} from '../../features/usersSlice';
import { useNavigate, useParams } from 'react-router';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(10),
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
  save: {
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  cancel: {
    marginLeft: '10px',
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  haveaccount: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
    marginRight: '0',
  },
  signin: {
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
}));
const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const token = useSelector(getUserToken);
  const updatedUserData = useSelector(getUpdatedUserData);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    error: '',
  });

  const params = useParams();

  useEffect(() => {
    dispatch(fetchUserData(params.userId));
    //check if user token exists.
    dispatch(userToken());
    //In case user tried to visit url /protected without token, redirect
    //to signin page
    if (
      token === 'Request failed with status code 500' ||
      token === 'Request failed with status code 401'
    ) {
      navigate('/');
      window.location.reload();
    }
    setValues({
      firstName: userData.firstName,
      lastName: userData.lastName,
      nickname: userData.nickname,
    });

    if (updatedUserData.hasOwnProperty('message')) {
    
      dispatch(cleanUpdatedUserData());
      navigate('/dashboard');
    }
  }, [params.userId, updatedUserData.message, dispatch, userData.firstName]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      params: params.userId,
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      nickname: values.nickname || undefined,
    };
    dispatch(updateUserData(user));
  };

  const cancel = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      {userData.firstName ? (
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id='firstName'
              className={classes.textField}
              value={values.firstName ? values.firstName : ''}
              onChange={handleChange('firstName')}
              margin='normal'
            />
            <br />

            <TextField
              id='lastName'
              className={classes.textField}
              value={values.lastName ? values.lastName : ''}
              onChange={handleChange('lastName')}
              margin='normal'
            />
            <br />

            <TextField
              id='nickname'
              className={classes.textField}
              value={values.nickname ? values.nickname : ''}
              onChange={handleChange('nickname')}
              margin='normal'
            />
            <br />
            <br />

            {updatedUserData.hasOwnProperty('error') && (
              <Typography component='p' color='error'>
                <Icon color='error' className={classes.error}></Icon>
                {updatedUserData.error.split(':')[2]
                  ? updatedUserData.error.split(':')[2]
                  : updatedUserData.error}
              </Typography>
            )}
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
                className={classes.cancel}
                onClick={cancel}
              >
                Cancel
              </Button>
            </div>
          </CardActions>
        </Card>
      ) : (
        ''
      )}
    </div>
  );
};

export default EditProfile;
