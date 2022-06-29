import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Icon from "@material-ui/core/Icon"
import { makeStyles } from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux';
import { 
    getUserTransactionData, 
    cleanTransactionUpdatedData, 
    updateUserTransaction, 
    getUpdatedUserTransaction, 
    fetchUserTransactions, 
    userToken,
    getUserToken,
    fetchUserTransactionData, 
    getUserTransactions} from "../../features/usersSlice"
import { useNavigate, useParams } from "react-router"
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

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

const EditTransaction = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const transactionData = useSelector(getUserTransactionData)
    const updatedUserTransactionData = useSelector(getUpdatedUserTransaction)
    const userTransactions = useSelector(getUserTransactions)
    const navigate = useNavigate()
    const token = useSelector(getUserToken)
    const [values, setValues] = useState({
        title: '',
        amount: '',
        currency: ''
    })

    const params = useParams()

    useEffect(()=>{
        dispatch(fetchUserTransactions())
        //check if user token exists. 
        dispatch(userToken())
         //In case user tried to visit url /protected without token, redirect 
         //to signin page
         if(token === 'Request failed with status code 500'
         || token==='Request failed with status code 401'){
             navigate('/')
             window.location.reload()
         }
    
         //Call to fetch single transaction would load with delay 
         //so I revised the logic and solved the problem
         userTransactions.transactions
         .filter(item => item._id === params.transactionId)
         .map(item=>{
            setValues({
                title: item.title,
                amount: item.currency === 'EUR' ? item.amountInEUR
                :  item.currency === 'USD' ? item.amountInUSD
                :  item.currency === 'BAM' ? item.amountInBAM : '',
                currency: item.currency,
                
            })
         })
    
        //if data updated redirect to transactions 
        if(updatedUserTransactionData.hasOwnProperty('message')){
            dispatch(cleanTransactionUpdatedData())
            navigate('/transactions')
        }

    },[dispatch, params.transactionId, transactionData.length, updatedUserTransactionData.message, token.length])

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    let transaction = {
        params: params.transactionId,
        title: values.title || undefined,
        amount: values.amount,
        currency: values.currency || undefined  
    }

    const clickSubmit = () => {
        switch(transaction.currency){
            case 'BAM':
                transaction = {
                    params: params.transactionId,
                    title: values.title || undefined,
                    amountInBAM: Number(values.amount) || undefined,
                    amountInUSD: Number((values.amount * 0.58).toFixed(2)) || undefined,
                    amountInEUR: Number((values.amount * 0.51).toFixed(2)) || undefined,
                    currency: values.currency || undefined,
                 }
                 break;
            case 'USD':
                transaction = {
                    params: params.transactionId,
                    title: values.title || undefined,
                    amountInBAM: Number((values.amount * 1.72).toFixed(2)) || undefined,
                    amountInUSD: Number(values.amount),
                    amountInEUR: Number((values.amount * 0.88).toFixed(2)) || undefined,
                    currency: transaction.currency || undefined,
                 }
                 break;
            case 'EUR':
                transaction = {
                    params: params.transactionId,
                    title: values.title || undefined,
                    amountInBAM: Number((values.amount * 1.96).toFixed(2)) || undefined,
                    amountInUSD: Number((values.amount * 1.14).toFixed(2)) || undefined,
                    amountInEUR: Number(values.amount),
                    currency: transaction.currency || undefined,
                 }
                 break;
                
        }

        dispatch(updateUserTransaction(transaction))    
    }

    const cancel = () => {
        navigate('/transactions')
    }

    

    return(
        <div>
            <Card className={classes.card}>
                <CardContent>

                    <TextField id="title" className={classes.textField}
                    value={values.title ? values.title : ''} onChange={handleChange('title')} margin="normal" />
                    <br />

                    <TextField id="lastName" className={classes.textField}
                    value={values.amount ? values.amount : ''} 
                    
                    onChange={handleChange('amount')} margin="normal" />
                    <br />

            
                    <br />
                    <br />

                    {
                        updatedUserTransactionData.hasOwnProperty('error') && (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                                {updatedUserTransactionData.error.split(':')[2] ?
                                updatedUserTransactionData.error.split(':')[2] 
                                : updatedUserTransactionData.error}
                            </Typography> 
                        ) 
                    }

                    <span>
                     <div style={{display:'inline-flex', padding:'0', marginLeft:"15px"}}>
                    <FormControl>
                    <InputLabel variant="standard" htmlFor="currency">
                      Currency
                    </InputLabel>
                     <NativeSelect
                       classes={classes.currency} 
                        value={values.currency ? values.currency : ''}
                        margin="dense"
                        variant="filled"
                        onChange={handleChange('currency')}
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

                    <div style={{margin:'0 auto'}}>
                        <Button color='primary' variant="contained" onClick={clickSubmit}
                        className={classes.save}>Save</Button>

                        <Button color='primary' variant="contained" 
                        className={classes.cancel} onClick={cancel}>Cancel</Button>
                   </div>

                </CardActions>

            </Card>

        </div>
    )
}

export default EditTransaction