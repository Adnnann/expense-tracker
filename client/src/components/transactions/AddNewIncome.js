import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card'
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from '@material-ui/core/Button'
import TextField from "@material-ui/core/TextField"
import ButtonGroup from '@mui/material/ButtonGroup';
import { Icon, makeStyles } from "@material-ui/core"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router"
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { 
    createTransaction, 
    getTransactionData, 
    fetchUserTransactions, 
    userToken,
    getUserToken, 
    cleanTransactionData } from "../../features/usersSlice"
import jwtDecode from 'jwt-decode'
import { Typography } from "@material-ui/core"
import date from 'date-and-time'
import { DateTime } from "luxon"

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
    textFieldTitle:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300,
        borderBottomWidth:'1.2px',
        borderBottomColor:'green',
        borderBottomStyle:'solid',
        paddingTop:0,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:0
    },
    textFieldAmount:{
        marginLeft: theme.spacing(1),
        marginRight:theme.spacing(2),
        width:200,
        borderBottomWidth:'1.2px',
        borderBottomColor:'green',
        borderBottomStyle:'solid',
        paddingTop:13,
        paddingLeft:0,
        paddingRight:0,
        paddingBottom:0
    },
    submit:{
        margin:'auto',
        marginBottom:theme.spacing(2)
    },
    hasAccount:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
        marginRight:"0"
    },
    signin:{
        margin: 'auto',
        marginBottom: theme.spacing(1),
    },
    buttonGroup:{
        textTransform: 'none',
        borderStyle:'solid',
        borderRightColor:"black",
        marginRight:'10px'
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
    currency:{
        borderBottomColor:'green',
        borderBottomStyle:'solid',
        borderWidth:'1px'
    }
}))
const AddNewIncome = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const transactionData = useSelector(getTransactionData)
    const token = useSelector(getUserToken) 

    const [currency, setCurrency] = useState('BAM')
    const [values, setValues] = useState({
        userId: jwtDecode(token.message)._id,
        title:'',
        amount:'',
        currency:'',
        valueInBAM:'',
        valueInUSD:'',
        valueInEUR:'',
        open:false,
        error:''
    })

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
        //if addedd successfuly redirect to transactions
        if(transactionData.hasOwnProperty('message')){
            dispatch(cleanTransactionData())
            dispatch(fetchUserTransactions())
            navigate('/transactions')
        }
        
    },[transactionData.message, token.length])

    
    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const currencyHandleChange = (event) => {
        setCurrency(event.target.value)
    }

    const clickSubmit = () => {

        let income = {
            userId: '',
            title: values.title || undefined,
            amount: values.amount,
            amountInBAM:'',
            amountInUSD:'',
            amountInEUR:'',
            day: date.format(new Date(), "dddd"),
            week: 'Week ' + DateTime.now().weekNumber,
            month: date.format(new Date(), "MMM"),
            year:  date.format(new Date(), "YYYY"),
            currency: currency || undefined,
            type: ''
        }

        //based on user currency input calculate all values in remaning two currencies
        switch(currency){
            case 'BAM':
                income = {
                    userId:values.userId,
                    title: values.title || undefined,
                    amountInBAM: Number(income.amount) || undefined,
                    amountInUSD: Number((income.amount * 0.58)) || undefined,
                    amountInEUR: Number((income.amount * 0.51)) || undefined,
                    currency: currency || undefined,
                    day: date.format(new Date(), "dddd"),
                    week: 'Week ' + DateTime.now().weekNumber,
                    month: date.format(new Date(), "MMM"),
                    year:  date.format(new Date(), "YYYY"),
                    type: 'income'
                 }
                 break;
            case 'USD':
                income = {
                    userId: values.userId,
                    title: values.title || undefined,
                    amountInBAM: Number((income.amount * 1.72)) || undefined,
                    amountInUSD: Number(income.amount),
                    amountInEUR: Number((income.amount * 0.88)) || undefined,
                    currency: currency || undefined,
                    day: date.format(new Date(), "dddd"),
                    week: 'Week ' + DateTime.now().weekNumber,
                    month: date.format(new Date(), "MMM"),
                    year:  date.format(new Date(), "YYYY"),
                    type: 'income'
                 }
                 break;
            case 'EUR':
                income = {
                    userId: values.userId,
                    title: values.title || undefined,
                    amountInBAM: Number((income.amount * 1.96)) || undefined,
                    amountInUSD: Number((income.amount * 1.14)) || undefined,
                    amountInEUR: Number(income.amount),
                    day: date.format(new Date(), "dddd"),
                    week: 'Week ' + DateTime.now().weekNumber,
                    month: date.format(new Date(), "MMM"),
                    year:  date.format(new Date(), "YYYY"),
                    currency: currency || undefined,
                    type: 'income'
                 }
                 break;
                
        }
        dispatch(createTransaction(income))
    }
   
    return(
            
        <Card className={classes.card}>
               
                <CardContent>

                    <CardActions>
                        <div style={{margin:'0 auto'}}>
                        <ButtonGroup style={{marginTop:"10%", borderBottomStyle:"solid", borderRadius:'0'}}>
                            <Button variant="contained" 
                            className={classes.buttonGroup} 
                            style={{borderRightStyle:'solid', borderRightColor:'black', borderRightWidth:'1px', borderRadius:'0px'}}
                            onClick={()=>navigate('/transactions/addNewIncome')}>Income</Button>

                            <Button className={classes.buttonGroup} 
                            onClick={()=>navigate('/transactions/addNewExpense')}>Expense</Button>
                        </ButtonGroup>
                    </div>
                    </CardActions>

                    <TextField id="title" placeholder="Title*" className={classes.textFieldTitle}
                     onChange={handleChange('title')} margin="dense" />
                    <br />

                  <>
                    <TextField id="amount" placeholder="Amount" className={classes.textFieldAmount}
                    onChange={handleChange('amount')} margin="dense" />
               </>
                

                    { //display error returned from server
                        transactionData.hasOwnProperty('error') && (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                                {transactionData.error}
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
                       className={classes.currency} 
                       margin="dense"
                        variant="filled"
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
                    <div style={{margin:'0 auto'}}>
                    <Button color='primary' variant="contained" onClick={clickSubmit}
                    className={classes.save}>Save</Button>
                    <Button color='primary' variant="contained" onClick={()=>navigate('/transactions')}
                   className={classes.cancel}>Cancel</Button>
                   </div>
                </CardActions>

            </Card>
    )
}

export default AddNewIncome