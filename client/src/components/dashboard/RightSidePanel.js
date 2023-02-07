import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import date from 'date-and-time'
import {getUserTransactions, 
        getCurrencyExchangeRate 
} from '../../features/usersSlice';
import { useSelector } from 'react-redux';


const RightSidePanel = () => {

  //get dashboard data
  const userTransactions = useSelector(getUserTransactions)
  const currencyExchangeRate = useSelector(getCurrencyExchangeRate)

  // define rows for displaying trnsactions
  const columns = [
    { 
        id: 'recent', 
        label: 'Recent', 
        minWidth: 170,
        align:'center'
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      
    }
  ];
  
  //create rows
  function createData(recent, amount) {
    return { recent, amount};
  }
  
  const rows = [];
 
  //display date differently depending if data have been submitted on the same day when user is using dashboard (hour and hours ago)
  // or same other day
   const dateDiff = (date2) => {
    let date1 = new Date()
 
    return date.isSameDay(date1, date2) ?  
     Math.round(date.subtract(date1, date2).toHours(), 0) === 1 ?
     Math.round(date.subtract(date1, date2).toHours(),0) + ' hour ago'
    : Math.round(date.subtract(date1, date2).toHours(),0) + ' hours ago' 
    : date.format(date2, "DD  MMMM YYYY")
  }
  // format big numbers
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

    userTransactions.transactions.filter(item => new Date(item.created) >
    new Date((new Date()).getTime() - (3 * 24 * 60 * 60 * 1000)))
    .map(item=>{
    
    //use dateDiff on returned date values from database 
    const firstRow = <div>{item.title}<br/><span style={{color:"grey", fontSize:"10px"}}>
                      {dateDiff(new Date(item.created))}</span></div>
    const secondRow =<span style={{color: item.type === 'income' ? 'green'
                      : 'red'}}> {item.type === 'income' ? 
                      `+ ${intToString((item.amountInBAM * currencyExchangeRate).toFixed(2))}`
                      : `- ${intToString((item.amountInBAM * currencyExchangeRate).toFixed(2))}`
                      }</span> 
  // generate rows 
  return rows.push(createData(firstRow, secondRow)) 
  })

  return (
 
    <Paper sx={{ width: '100%', overflow: 'hidden', overflowX:"none", wordBreak:'break-all', marginTop:'20px' }}>
    { Object.keys(userTransactions).length !== 0 ? 
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={Math.random()*100}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:'grey' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, index) => {
                return (
                  <TableRow style={{padding: '0 !important', height:'90px', wordBreak:"break"}} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={Math.random() * 10} align={column.align} style={{wordBreak:'break-all'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      : ''} 
    </Paper>
   
  );
}

export default RightSidePanel