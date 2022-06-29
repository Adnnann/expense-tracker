import React, {useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import { useSelector, useDispatch } from 'react-redux';
import { getPasswordCheckData, 
        getUpdatedUserData, 
        passwordCheck,
        updateUserPassword,
        cleanUpdatedUserData,
        cleanPasswordCheckData,
        getUserSigninData} from "../../features/usersSlice"
import { useNavigate } from "react-router"
import { Typography } from "@material-ui/core"
import { Icon } from "@material-ui/core"
import { useEffect } from "react"

const useStyles = makeStyles(theme=>({
    card:{
        maxWidth: 600,
        margin:'auto',
        textAlign: 'center',
        marginTop:theme.spacing(10),
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
    haveaccount:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
        marginRight:"0"
    },
    signin:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },


}))
const EditPassword = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const userPasswordCheckData = useSelector(getPasswordCheckData)
    const updatedUserData = useSelector(getUpdatedUserData)

    const userData = useSelector(getUserSigninData)
    const navigate = useNavigate()
    const [values, setValues] = useState({
        oldPassword:'',
        newPassword:'',
        confirmNewPassword: '',
        error: '',
        open: false
    })

    useEffect(()=>{
        // if user after password check if cleared send update password request to server
        if(userPasswordCheckData.hasOwnProperty('token')){
            dispatch(updateUserPassword(user))
        }
    },[dispatch, userPasswordCheckData.token])

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const user = {
        params: userData.user._id,
        password: values.newPassword
       
    }
    const clickSubmit = () => {
       // prepare data for authorization of the password
        const checkData = {
            email: userData.user.email,
            password: values.oldPassword
        } 
        // return error if passwords are empty or do not match
        if(!values.oldPassword || !values.confirmNewPassword || !values.newPassword){
            setValues({...values, error:'All information have to be entered'})
            return
        }else if(values.newPassword !== values.confirmNewPassword){
            setValues({...values, error:'New password and repetead password do not match'})
            return
        }else{
            setValues({...values, error:''})
        }
        // if cleared send user data to server to match with user data
        dispatch(passwordCheck(checkData))

    }
    // dispatch clear functions to get clean store slices for further actions
    const redirectToDashboard = () => {
        dispatch(cleanUpdatedUserData())
        dispatch(cleanPasswordCheckData())
        navigate('/dashboard')
    }
    
    return(
        <div>
            <Card className={classes.card}>
                <CardContent>

                    <TextField id="oldPassword" placeholder="Enter Old Password" className={classes.textField}
                    value={values.oldPassword} type="password" onChange={handleChange('oldPassword')} margin="normal" />
                    <br />

                    <TextField id="newPassword" type="password" placeholder="New Password*" className={classes.textField}
                    value={values.newPassword} onChange={handleChange('newPassword')} margin="normal" />
                    <br />


                    <TextField id="confirmNewPassword" type='password' placeholder="Confirmation New Password" className={classes.textField}
                    value={values.confirmNewPassword} onChange={handleChange('confirmNewPassword')} margin="normal" />
                    <br />

                    <br />

                    {
                        values.error ? (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                                {values.error}
                            </Typography> 
                        ) 
                        :    //checking if there is error reported when checking if user provided correct error 
                        //and then checking if updated password match user schema requirement. Had to put it here as 
                        // moongoose-beatiful-validator is returning very long and ugly message
                            userPasswordCheckData.hasOwnProperty('error') || updatedUserData.hasOwnProperty('error')  ? (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                            {updatedUserData.hasOwnProperty('error') ? updatedUserData.error : 'Incorrect password'}
                            </Typography> 
                        ) : null
                
                    }

                </CardContent>

                <CardActions>
                    <div style={{margin:'0 auto'}}>
                    <Button color='primary' variant="contained" onClick={clickSubmit}
                    className={classes.save}>Save</Button>
                    <Button color='primary' variant="contained" onClick={()=>navigate('/dashboard')}
                   className={classes.cancel}>Cancel</Button>
                   </div>
                </CardActions>

            </Card>
            
            <Dialog open={// if server return success message for updating password display Dialogue to user
                updatedUserData.hasOwnProperty('message') ? true : false
                }>
                <DialogContent>
                    <DialogContentText>
                        Password changed successfuly!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <Button color="primary" autoFocus="autoFocus" onClick={redirectToDashboard}>Return to dashboard</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default EditPassword