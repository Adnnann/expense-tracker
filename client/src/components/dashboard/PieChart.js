import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const PieChart = ({ income, expense }) => {
  //create pie chart to be displayed on dashboard
  const Plot = createPlotlyComponent(Plotly);

  console.log('expense', expense, 'income', income);

  const intToString = (num) => {
    num = num.toString().replace(/[^0-9.]/g, '');
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
  };
  return (
    <Plot
      data={[
        {
          values: [expense, income],
          type: 'pie',
          labels: [
            `${expense ? 'Expense <br /> -' + intToString(expense) : ''}`,
            `${income ? 'Income <br />' + intToString(income) : ''}`,
          ],
          textinfo: 'label',
          // automargin: true,
          showlegend: false,
          textfont: {
            size: 12,
            color: ['red', 'green'],
          },
          marker: {
            colors: ['grey', 'lightgrey'],
          },
        },
      ]}
      layout={{
        width: 300,
        height: 300,
        font: { size: 20, color: ['green', 'red'] },
        margin: { t: 10, b: 10, l: 10, r: 0, pad: '0' },
      }}
    />
  );
};

export default PieChart;
