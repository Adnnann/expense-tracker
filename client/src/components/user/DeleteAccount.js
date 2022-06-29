import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"
import { makeStyles } from "@material-ui/core"
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useSelector, useDispatch } from 'react-redux';
import { 
    fetchUserData, 
    closeAccount, 
    passwordCheck, 
    getPasswordCheckData,
    getUserToken,
    userToken, 
    getUserSigninData,
    getDeleteAccountModal,
    setDeleteAccountModal,
    getCloseAccountData,
    cleanStore} from "../../features/usersSlice"
import { useNavigate, useParams } from "react-router"

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  height:300,
  bgcolor: 'black',
  border: '2px solid #000',
};

const useStyles = makeStyles(theme=>({
    card:{
        maxWidth: 600,
        margin:'auto',
        textAlign: 'center',
        marginTop:theme.spacing(5),
        paddingBottom:theme.spacing(2)
    },
    error:{
        verticalAlign:'middle',
        fontSize:"18px"
    },
    tittle:{
        marginTop:theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300
    },
    save:{
        marginBottom:theme.spacing(2),
        minWidth:110
    },
    cancel:{
        marginLeft:'10px',
        marginBottom:theme.spacing(2),
        minWidth:110
    },
}))


const DeleteAccount = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const userPasswordCheckData = useSelector(getPasswordCheckData)
    const userData = useSelector(getUserSigninData)
    const closeAccountData = useSelector(getCloseAccountData)
    const navigate = useNavigate()
    const token = useSelector(getUserToken)
    const deleteAccountModal = useSelector(getDeleteAccountModal)
    const [values, setValues] = useState({
        email:'',
        password:'',
    })

    
    const params = useParams()

    useEffect(()=>{
            //check if user token exists. 
            dispatch(userToken())
            //In case user tried to visit url /protected without token, redirect 
            //to signin page
            if(token === 'Request failed with status code 500'
            || token ==='Request failed with status code 401'){
                navigate('/')
                window.location.reload()
            }

       dispatch(fetchUserData(params.userId))

       if(userPasswordCheckData.hasOwnProperty('token')){
        dispatch(closeAccount(params.userId)) 
     }

     if(closeAccountData.hasOwnProperty('message')){
         dispatch(setDeleteAccountModal(false))
         dispatch(cleanStore())
         navigate('/signup')
     }

   },[token.length, params.userId, userPasswordCheckData.token, closeAccountData.message])

    const handleChange = name => event =>{
        setValues({[name]: event.target.value})
    }

    const confirm = () => {
        const user = {
            email: userData.user.email,
            password: values.password || undefined
        }
         dispatch(passwordCheck(user))
         dispatch(setDeleteAccountModal(false))

    } 

    const cancel = () => {
        navigate('/dashboard')
    }

    const closeModal = () => {
        dispatch(setDeleteAccountModal(false))
    }


    return(
        <div>
            <Card className={classes.card}>
                <CardContent>
                   
                    <TextField id="password" type='password' placeholder="Password" className={classes.textField}
                    value={values.password} onChange={handleChange('password')} margin="normal" />
                    <br />
                    <br />

                    { userPasswordCheckData.hasOwnProperty('error') ? 
                        <Typography component='p' color='error'>
                            <Icon color='error' className={classes.error}></Icon>
                            Incorrect password
                        </Typography> 
                     : null
                }

                </CardContent>

                <CardActions>
                    <div style={{margin:'0 auto'}}>
                    <Button color='primary' variant="contained" onClick={confirm}
                    className={classes.save}>Save</Button>
                    <Button color='primary' variant="contained" onClick={cancel}
                   className={classes.cancel}>Cancel</Button>
                   </div>
                </CardActions>
    
            </Card>

            <div>
      
      
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={deleteAccountModal}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
       <div style={{margin:'0 auto', 
       backgroundColor:'black',height:220, width:400, opacity:"0.8", textAlign:'center'}}>
  
          <h2 id="unstyled-modal-title" style={{color:'white', fontWeight:'bold'}}>DELETE ACCOUNT</h2>
          <p id="unstyled-modal-description" style={{color:'white'}}>Are you sure you want to proceed?</p>
         
                    <Button color='primary' variant="contained" onClick={closeModal}
                    className={classes.save}>OK</Button>
                    <Button color='primary' variant="contained" onClick={cancel}
                   className={classes.cancel}>Cancel</Button>
                   
        
        
        </div>
      </StyledModal>


                
              
    </div>
               
           
                

        </div>
    )
}

export default DeleteAccount