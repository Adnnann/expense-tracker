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

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2010',
    uv: 4000,
    pv: 2400,
    amt: 2400,
    
  },
  {
    name: '2011',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },

];


const Plots = () => {
    
  const userTransactions = useSelector(getUserTransactions)
  const filterVarForCharts = useSelector(getFilterVarForCharts)  
  const groupingVarForCharts = useSelector(getGroupingVarForCharts)
  const chartType = useSelector(getChartType)

  const Plot = createPlotlyComponent(Plotly);

    return (
    
   Object.keys(userTransactions).length !== 0 && Object.values(userTransactions.transactions).length !== 0 ?
     // display chart based on user selection. 
     // Type string for charts is stored in Redux store
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
        name:'Income',
        

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
    

  layout={{  width:350,margin:{t:4, b:1,r:50,l:50}}}
      /> :
//pie chart has different logic so in case user did not select either bar chart
//or linechart then display pie chart
<Plot 
data = {[
  {
            values: [..._.chain(Object.values(userTransactions.transactions))
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
                    ..._.chain(Object.values(userTransactions.transactions))
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
                    .value()],
            type: 'pie',
             labels: ['Incomes', 'Expenses'],
            textinfo:'label',
            automargin: true,
            showlegend: false,
            textfont:{
                size:8,
                color: 'black'
            },
            marker:{
                colors:['green','red']
            },
            domain: {
              row: 0,
              column: 0
 },
  title:{
    text:'Incomes VS. expenses',
    
  }
          },
          
          
]}
layout={{width: 400, height: 400, font:{size:20, color:['green','red']}, margin: {"t":10, "b":10, "l": 10, "r":0,pad:"0"}}}

/> 

: <Typography component="p" style={{textAlign:'center', fontStyle:'italic'}}>
    Click on the tab transactions and start adding incomes or expenses to generate statistical overview   
    </Typography>) 
          
  
}

export default Plots