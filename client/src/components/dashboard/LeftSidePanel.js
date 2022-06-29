import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Box } from "@mui/material";
import Typography from "@material-ui/core/Typography"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from "@material-ui/core"
import PieChart from "./PieChart";
import { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getFilter, 
        getUserTransactions, 
        getCurrencyExchangeRate, 
        setCurrencyExchangeRate,
        setFilterVarForCharts,
        setGroupingVarForCharts,
        setStatisticsOverviewLevel,
        setGroupingVar,
        setTransactionsOverviewLevel,
        getCurrency,
        setCurrency  
} from '../../features/usersSlice';                 
import _ from 'lodash'
import { useNavigate } from 'react-router';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const useStyles = makeStyles(theme=>({
    buttonGroup:{
        textTransform: 'none',
        borderStyle:'solid',
        borderRightColor:"black",
        marginRight:'10px'
    }

}))

const LeftSideDashboard = () => {

    const classes = useStyles()
    const userTransactions = useSelector(getUserTransactions)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const filter = useSelector(getFilter)
    const currency = useSelector(getCurrency)
    const currencyExchangeRate = useSelector(getCurrencyExchangeRate)

    //manage dropdown menus in selection panel for transactions
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
     //manage dropdown menus in selection panel for statistical overview
    const [anchorElStatistics, setAnchorElStatistics] = useState(null);
    const openStatistics = Boolean(anchorElStatistics);
  
    const handleClose = () => {
        setAnchorEl(null);
      };
  
      const handleCloseStatistics = () => {
        setAnchorElStatistics(null)
      }
  
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
      const handleClickStatistics = (event) => {
        setAnchorElStatistics(event.currentTarget);
      };

    //set currency coeficient based on user input
    const handleChange = (event) => {

      dispatch(setCurrency(event.target.value))
      
      switch(event.target.value){
        case 'BAM':
          dispatch(setCurrencyExchangeRate(1))
          break;
        case 'USD':
          dispatch(setCurrencyExchangeRate(0.58))
          break;
        case 'EUR':
          dispatch(setCurrencyExchangeRate(0.51))
          break;
      }
    };

//present data in more professional way without too many numbers
  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
        return num;
    }
    let si = [
      {v: 1E3, s: "K"},
      {v: 1E6, s: "M"},
      {v: 1E9, s: "B"},
      {v: 1E12, s: "T"},
      {v: 1E15, s: "P"},
      {v: 1E18, s: "E"}
      ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
  }

  //navigate to transactions and group and filter data in accordance with user input
  const dailyData = () => {
    dispatch(setGroupingVar('day'))
    dispatch(setTransactionsOverviewLevel('Daily'))
    navigate('/transactions')
  }

  const weeklyData = () => {
    dispatch(setGroupingVar('week'))
    dispatch(setTransactionsOverviewLevel('Weekly'))
    navigate('/transactions')
  }

  const monthlyData = () => {
    dispatch(setGroupingVar('month'))
    dispatch(setTransactionsOverviewLevel('Monthly'))
    navigate('/transactions')
  }

  const annualData = () => {
    dispatch(setGroupingVar('year'))
    dispatch(setTransactionsOverviewLevel('Annualy'))
    navigate('/transactions')
 }

 //navigate to statistics and group and filter data in accordance with user input
 const week = () => {
  dispatch(setFilterVarForCharts('week'))
  dispatch(setGroupingVarForCharts('day'))
  dispatch(setStatisticsOverviewLevel('Week'))
  navigate('/statistics')
}

const month = () => {
  dispatch(setFilterVarForCharts('month'))
  dispatch(setGroupingVarForCharts('week'))
  dispatch(setStatisticsOverviewLevel('Month'))
  navigate('/statistics')
}

const year = () => {
  dispatch(setFilterVarForCharts('year'))
  dispatch(setGroupingVarForCharts('month'))
  dispatch(setStatisticsOverviewLevel('yEAR'))
  navigate('/statistics')
}

    return(
    
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
            }}
            >
            
            <>
                <ButtonGroup style={{marginTop:"10%", borderBottomStyle:"solid"}}>
                    <Button variant="contained" className={classes.buttonGroup}>Dashboard</Button>
                    
                    {//menu for transactions
                    }
                    <><div>
                    <Button
                    style={{textTransform:'none'}}
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Transactions
                </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                    <MenuItem onClick={dailyData} disableRipple>
                         Daily
                    </MenuItem>

                    <MenuItem onClick={weeklyData} disableRipple>
                         Weekly
                    </MenuItem>

                    <MenuItem onClick={monthlyData} disableRipple>
                        Monthly
                    </MenuItem>

                    <MenuItem onClick={annualData} disableRipple>
                        Yearly
                    </MenuItem>
                    
                </StyledMenu>
                </div>
                </>

                <><div style={{marginLeft:"auto"}}>
                    <Button
                    style={{textTransform:'none'}}
                    id="demo-customized-button"
                    aria-controls={openStatistics ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openStatistics ? 'true' : undefined}
                    disableElevation
                    onClick={handleClickStatistics}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Statistics
                </Button>
                    <StyledMenu
                      id="demo-customized"
                      MenuListProps={{
                      'aria-labelledby': 'demo-customized',
                      }}
                      anchorEl={anchorElStatistics}
                      open={openStatistics}
                      onClose={handleCloseStatistics}
                    >
                

                    <MenuItem onClick={week} disableRipple>
                         Week
                    </MenuItem>

                    <MenuItem onClick={month} disableRipple>
                        Month
                    </MenuItem>

                    <MenuItem onClick={year} disableRipple>
                        Year
                    </MenuItem>
                  
                    
                </StyledMenu>
                </div>
                </>
        
                </ButtonGroup>
                </>
    {Object.keys(userTransactions).length !== 0 ?
    <>
                <Typography variant="h6" style={{marginBottom:'0'}}>
                    Total Balance
                </Typography>

                <span>
                    <div style={{display:'inline-flex', marginBottom:"0"}}>
                    <FormControl>
                        <InputLabel variant="standard" htmlFor="currency">
                            Currency
                        </InputLabel>
                        <NativeSelect
                            inputProps={{
                            name: 'currency',
                            id: 'currency',
                            }}
                            value={currency}
                            onChange={handleChange}
                        >
                            <option value={'BAM'}>BAM</option>
                            <option value={'USD'}>$</option>
                            <option value={'EUR'}>€</option>
                        </NativeSelect>
                    </FormControl>
                    </div>

                    <div style={{display:'inline-flex'}}>
                        <Typography variant='h5' style={{display:"inline-flex", marginTop:'10px', marginLeft:"5px", color:
                       _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='income'))
                          .isEmpty()
                          .value() &&

                          _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='expense'))
                          .isEmpty()
                          .value() ? 'black' 
                          
                          : _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='income'))
                          .isEmpty()
                          .value() ? 'red'
                          
                          : _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='expense'))
                          .isEmpty()
                          .value() ? 'green'
                          
                          : _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='income'))
                          .sumBy('amountInBAM')
                          .value() <
                          _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='expense'))
                          .sumBy('amountInBAM')
                          .value() ? 'red' : 'black' }}>
                      
                         { //filter and sumby grouped data to get total sum of all transactions. Filter data to show only incomes or only expenses based on user input
                          //if either expenses or incomes do not exit show data that are available (either incomes or expense)
                          _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='income'))
                          .isEmpty()
                          .value() &&

                          _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='expense'))
                          .isEmpty()
                          .value() ? '0'
                          
                          : _.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='income'))
                          .isEmpty()
                          .value() ?
                          `- ${intToString((_.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='expense'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate).toFixed(2))} ` 

                          :_.chain(Object.values(userTransactions.transactions)
                          .filter(item=>item.type==='expense'))
                          .isEmpty()
                          .value() ?
                          intToString((_.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='income'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate).toFixed(2))
                          //if income smaller than expense show - before the total sum
                          : _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='income'))
                          .sumBy('amountInBAM')
                          .value() <
                          _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='expense'))
                          .sumBy('amountInBAM')
                          .value() ?
                           `- ${intToString((_.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='income'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate
                          - _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='expense'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate).toFixed(2))}`
                          // If incomes higher than expenses just subtract expenses from incomes
                          : intToString((_.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='income'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate
                          - _.chain(Object.values(userTransactions.transactions).filter(item=>item.type==='expense'))
                          .sumBy('amountInBAM')
                          .value()*currencyExchangeRate).toFixed(2))
                        } 
                        </Typography>
                    </div>
                </span>

                
                    <PieChart 
                    //group and summarize data to get expenses and incomes
                    income={_.chain(Object.values(userTransactions.transactions).filter(item=>item.type===filter.income || item.type===filter.expense))
                                .groupBy('type')
                                .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                                .value().income  ? (_.chain(Object.values(userTransactions.transactions).filter(item=>item.type===filter.income || item.type===filter.expense))
                                .groupBy('type')
                                .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                                .value().income * currencyExchangeRate).toFixed(2) : '' } 
                    expense={_.chain(Object.values(userTransactions.transactions).filter(item=>item.type===filter.income || item.type===filter.expense))
                                .groupBy('type')
                                .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                                .value().expense ? 
                                (_.chain(Object.values(userTransactions.transactions).filter(item=>item.type===filter.income || item.type===filter.expense))
                                .groupBy('type')
                                .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                                .value().expense * currencyExchangeRate).toFixed(2) : ''} 
                    />
                  
             </>
             //instruct user to go to tab transactions to start adding incomes and expenses in order to get the report
             : <Typography component="p" style={{textAlign:'center', fontStyle:'italic'}}>
                 Click on the tab transactions and start adding incomes or expenses to generate dashboard data   
                </Typography>
             
             }  
           </Box>
    )
}

export default LeftSideDashboard