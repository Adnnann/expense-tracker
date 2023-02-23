import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';
import {
  getFilterVarForCharts,
  getChartType,
  getGroupingVarForCharts,
} from '../../features/statisticsSlice';
import { useSelector } from 'react-redux';
import { useFetchUserTransactionsQuery } from '../../features/transactionsAPI';
import { calculateTotalIncomesAndExpenses } from '../utils/functions/helper-functions';

const Plots = () => {
  const {data:userTransactions, isSuccess} = useFetchUserTransactionsQuery()
  const groupingVarForCharts = useSelector(getGroupingVarForCharts);
  const chartType = useSelector(getChartType);

  
  const Plot = createPlotlyComponent(Plotly);

   
  return isSuccess && userTransactions.length > 0 && (
    // display chart based on user selection.
    // chart type is stored in Redux store
    chartType !== 'pie' ? (
      <Plot
        data={[
          {
            type: chartType,
            label: ['Incomes'],
            textinfo: 'label',
            hoverinfo: 'label',
            x: [calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'income')],
            y: [calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'income')],
            showlegend: false,
            marker: { color: 'green' },
            name: 'Income',
          },
          {
            showlegend: false,
            type: chartType,
            textinfo: 'percent+label',
            x: [calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'expense')],
            y: [calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'expense')],
            marker: { color: 'red' },
            name: 'Expense',
          },
        ]}
        layout={{ width: 350, margin: { t: 4, b: 20, r: 50, l: 50 } }}
      />
    ) : (
      //pie chart has different logic so in case user did not select either bar chart
      //or linechart then display pie chart
      <Plot
        data={[
          {
            values: [
              calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'income'),
              calculateTotalIncomesAndExpenses(userTransactions, groupingVarForCharts,'expense'),
            ],
            type: 'pie',
            labels: ['Incomes', 'Expenses'],
            textinfo: 'label',
            automargin: true,
            showlegend: false,
            textfont: {
              size: 8,
              color: 'black',
            },
            marker: {
              colors: ['green', 'red'],
            },
            domain: {
              row: 0,
              column: 0,
            },
            title: {
              text: 'Incomes VS. expenses',
            },
          },
        ]}
        layout={{
          width: 400,
          height: 400,
          font: { size: 20, color: ['green', 'red'] },
          margin: { t: 10, b: 10, l: 10, r: 0, pad: '0' },
        }}
      />
    )
  ) 
};

export default Plots;
