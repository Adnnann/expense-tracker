import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';
import {
  getFilterVarForCharts,
  getChartType,
  getGroupingVarForCharts,
} from '../../features/usersSlice';
import _ from 'lodash';
import date from 'date-and-time';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { getUserTransactions } from '../../features/transactionsSlice';
import { calculateIncomesAndExpenses } from '../utils/functions/HelperFunctions';

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
  const userTransactions = useSelector(getUserTransactions);
  const filterVarForCharts = useSelector(getFilterVarForCharts);
  const groupingVarForCharts = useSelector(getGroupingVarForCharts);
  const chartType = useSelector(getChartType);

  const Plot = createPlotlyComponent(Plotly);

  //function to calculate total incomes and expenses for selected period
  //and to display them in chart
  const calculateTotalIncomesAndExpenses = (type) => {
    const result = userTransactions.data
      .filter((item) =>
        filterVarForCharts === 'week'
          ? item.week === `Week ${DateTime.now().weekNumber}`
          : filterVarForCharts === 'month'
          ? item.month === `${date.format(new Date(), 'MMM')}`
          : filterVarForCharts === 'year'
          ? item.year === `${date.format(new Date(), 'YYYY')}`
          : null,
      )
      .reduce((group, item) => {
        const { type } = item;
        group[type] = group[type] ?? [];
        group[type].push(item.amountInBAM);
        return group;
      }, {});

    return type === 'income'
      ? result.income.reduce((acc, item) => acc + item, 0)
      : result.expense.reduce((acc, item) => acc + item, 0);
  };
  return userTransactions.success && userTransactions.data.length > 0 ? (
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
            x: [calculateTotalIncomesAndExpenses('income')],
            y: [calculateTotalIncomesAndExpenses('income')],
            showlegend: false,
            marker: { color: 'green' },
            name: 'Income',
          },
          {
            showlegend: false,
            type: chartType,
            textinfo: 'percent+label',
            x: [calculateTotalIncomesAndExpenses('expense')],
            y: [calculateTotalIncomesAndExpenses('expense')],
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
              calculateTotalIncomesAndExpenses('income'),
              calculateTotalIncomesAndExpenses('expense'),
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
  ) : (
    <Typography component='p' style={{ textAlign: 'center', fontStyle: 'italic' }}>
      Click on the tab transactions and start adding incomes or expenses to generate statistical
      overview
    </Typography>
  );
};

export default Plots;
