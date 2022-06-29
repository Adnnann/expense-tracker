import React from 'react';
import createPlotlyComponent from "react-plotly.js/factory"
import Plotly from "plotly.js-basic-dist";
import {getFilterVarForCharts, 
        getUserTransactions, 
        getChartType, 
        getGroupingVarForCharts 
} from '../../features/usersSlice';
import _ from 'lodash'
import date from 'date-and-time'
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
const Plots = () => {
    
  const userTransactions = useSelector(getUserTransactions)
  const filterVarForCharts = useSelector(getFilterVarForCharts)  
  const groupingVarForCharts = useSelector(getGroupingVarForCharts)
  const chartType = useSelector(getChartType)

  const Plot = createPlotlyComponent(Plotly);

    return (
    Object.keys(userTransactions).length !== 0 && Object.values(userTransactions.transactions).length !== 0 ?
      // display chart based on user selection. 
      //Type string for charts is stored in Redux store
        chartType !== 'pie' ?
        <Plot
        data={[
      {
        type: chartType,
        textinfo:'percent+label',
        x: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='income')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                              //grouping var should be chnaged with filterVarForCharts
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    // CREATE FILTER IN STORE THE SAME WAY AS I MADE IT FOR TRANSACTIONS TAB DATA
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    // maps first values (grouped values)
                    .map(item => item[0])
                    .value(),
        y: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='income')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                              //grouping var should be chnaged with filterVarForCharts
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    // CREATE FILTER IN STORE THE SAME WAY AS I MADE IT FOR TRANSACTIONS TAB DATA
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    // maps first values (grouped values)
                    .map(item => item[1])
                    .value(),
        marker: {color: 'green'},
        name:'Income'
      },
      {
        type: chartType,
        x: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='expense')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                              //grouping var should be chnaged with filterVarForCharts
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    // CREATE FILTER IN STORE THE SAME WAY AS I MADE IT FOR TRANSACTIONS TAB DATA
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    // maps first values (grouped values)
                    .map(item => item[0])
                    .value(),
        y: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='expense')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                              //grouping var should be chnaged with filterVarForCharts
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    // CREATE FILTER IN STORE THE SAME WAY AS I MADE IT FOR TRANSACTIONS TAB DATA
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    // maps first values (grouped values)
                    .map(item => item[1])
                    .value(),
        marker: {color: 'red'},
        name:'Expense'
      },
      
    ]}
        layout={{width: 500, height: 350, margin: { "l": 10, "r":0,"b":20,"pad":0}  }}
      /> :
//pie chart has different logic so in case user did not select either bar chart
//or linechart then display pie chart
<Plot 
data = {[
  {
            values: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='income')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    // maps first values (grouped values)
                    .map(item => item[1])
                    .value(),
            type: 'pie',
            labels: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='income')
                      // Filters added based on user input. When user click on tab transaction and selects one option (week, month, or year) filter is stored in Reduc store and 
                      //data are filtered in accordance with user input

                      // filters can be week, month and year
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                              //grouping var should be chnaged with filterVarForCharts
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .map(item => item[0])
                    .value(),
            textinfo:'label',
            automargin: true,
            showlegend: false,
            textfont:{
                size:8,
                color: 'black'
            },
            marker:{
                colors:['grey','lightgrey']
            },
            domain: {
              row: 0,
              column: 0
  },
  title:{
    text:'Income',
  }
          },
          {
            values: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='expense')
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .map(item => item[1])
                    .value(),
            type: 'pie',
            labels: _.chain(Object.values(userTransactions.transactions))
                    .filter(item=>item.type==='expense')
                    .filter(filterVarForCharts === 'week' ?  {'week':`Week ${DateTime.now().weekNumber}`}
                            : filterVarForCharts === 'month' ? {'month':`${date.format(new Date(),"MMM")}`}
                            : filterVarForCharts === 'year' ? {'year':`${date.format(new Date(),"YYYY")}`}
                            : null)
                    .orderBy(['created'],['asc'])
                    .groupBy(`${groupingVarForCharts}`)
                    .mapValues(entries => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .map(item => item[0])
                    .value(),
            textinfo:'label',
            automargin: true,
            showlegend: false,
            title:"Expenses",
            textfont:{
                size:8,
                color: 'black'   
            },
            marker:{
                colors:['grey','lightgrey']
            },
            domain: {
              row: 0,
              column: 1
            },
          },
          
]}
layout={{width: 400, height: 400, font:{size:20, color:['green','red']}, margin: {"t":10, "b":10, "l": 10, "r":0,pad:"0"}, grid:{rows:1, columns:2} }}

/> 

: <Typography component="p" style={{textAlign:'center', fontStyle:'italic'}}>
    Click on the tab transactions and start adding incomes or expenses to generate statistical overview   
    </Typography>
          
  );
}

export default Plots