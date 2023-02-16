import { useEffect, useState } from 'react';
import {
  getUserToken,
  userToken,
  signoutUser,
  getFilter,
  cleanStore,
} from '../../features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Grid } from '@material-ui/core';
import { useIdleTimer } from 'react-idle-timer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LeftSidePanel from './LeftSidePanel';
import RightSidePanel from './RightSidePanel';
import Loader from '../utils/Loader';
import { getUserTransactions } from '../../features/transactionsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getUserToken);
  const userTransactions = useSelector(getUserTransactions);
  const [inactiveUser, setInactiveUser] = useState(false);
  const filter = useSelector(getFilter);

  useEffect(() => {
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
  }, [token.length, filter.income, dispatch]);

  //set timeout for user inactivity
  const timeout = 1200000;

  //if user active reset timer
  const handleOnActive = () => {
    reset();
  };

  //if user inactive set inactiveUser to true and display modal windown
  const handleOnIdle = () => {
    setInactiveUser(true);
  };

  const { reset } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  const redirectTosignin = () => {
    navigate('/');
    dispatch(signoutUser());
    dispatch(cleanStore())
  };

  return (
  
      <Grid container justifyContent='center'>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          <LeftSidePanel />
        </Grid>

        <Grid item xs={12} md={8} lg={6} xl={6}>
     
         <RightSidePanel /> 
  
        </Grid>
        <Dialog open={inactiveUser}>
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
      </Grid>


     

  );
};
export default Dashboard;
