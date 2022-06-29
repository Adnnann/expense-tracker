import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {getUserTransactions, 
        getGroupingVarForCharts, 
        getFilterVarForCharts, 
        getCurrencyExchangeRate 
} from '../../features/usersSlice';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import date from 'date-and-time'
import { DateTime } from 'luxon';


const RightPanelSatistics = () => {

  const userTransactions = useSelector(getUserTransactions)
  const groupingVarForCharts = useSelector(getGroupingVarForCharts)
  const filterVarForCharts = useSelector(getFilterVarForCharts)
  const currencyExchangeRate = useSelector(getCurrencyExchangeRate)


  //define table columns
  const columns = [
    { 
        id: 'recent', 
        label: 'Recent', 
        minWidth: 20,
        minHeight:20,
        align:'center'
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 20,
      minHeight:20,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'), 
    },
    {
      id: 'edit',
      minWidth: 20,
      minHeight:20,
      align: 'center',
  
    }
  ];
  
  function createData(recent, amount, edit) {
    return { recent, amount, edit};
  }
  
  const rows = [];

    
if(Object.keys(userTransactions).length !== 0){
      _.chain(Object.values(userTransactions.transactions))
      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
      //data are filtered in accordance with user input

      // filters can be week, month and year
    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
              //grouping var should be chnaged with filterVarForCharts
            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
            : null)
    .orderBy(['created'],['desc'])
    .groupBy(item=>
      groupingVarForCharts === 'day' ? `${item.day}`
      : groupingVarForCharts === 'week' ?`${item.week}${","}`
      : groupingVarForCharts === 'month' ?`${item.month}${","}`
      : groupingVarForCharts === 'year' ?`${item.year}${","}`:'')
  //below part is added to enable me to get income and expense sum for each level of disaggregation of
  //data: day, week, month or year and to be able to loop through it
  //and display data to the user
       .mapValues(item => 
            _.chain(item)
            .mapValues(item=>item)
            .groupBy(item=>`${item.type}`)
            .mapValues(item=>_.sumBy(item, 'amountInBAM'))
            .value())
      .toPairs() 
    .value().map(item=>{
        const firstRow = <div>{item[0]}</div>
        const secondRow =<span style={{color:'green'}}>{item[1].income ? `+ ${(item[1].income * currencyExchangeRate).toFixed(2)}` : '0'}</span>
        const thirdRow =<span style={{color:'red'}}>{item[1].expense ? `- ${(item[1].expense * currencyExchangeRate).toFixed(2)}` : '0'}</span>  
        // generate rows 
        return rows.push(createData(firstRow, secondRow, thirdRow)) 
      })
      
    }
    
    
  return (
   
    <Paper sx={{ overflow: 'hidden', overflowX:"none", wordBreak:'break-all', marginTop:"0", margin:'0 auto' }}>
    
    {Object.keys(userTransactions).length !== 0 && Object.values(userTransactions.transactions).length !== 0 ?
      <TableContainer sx={{ maxHeight: 200 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows
              .map((row, index) => {
                return (
                  <TableRow style={{ padding: '0 !important', height:'40px', wordBreak:"break"}} key={index}>
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

export default RightPanelSatistics