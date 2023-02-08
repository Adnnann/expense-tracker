import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';
const DonutChart = ({ income, expense, ratio }) => {
  // plotly package will be used for all charts in the project
  const Plot = createPlotlyComponent(Plotly);
  return (
    <Plot
      data={[
        {
          values: [expense, income],
          title: {
            //this is inside label. Add data dynamically expenses/incomes
            text: ratio,
            verticalAlign: 'middle',
            font: {
              size: 30,
              color: 'orange',
            },
          },
          type: 'pie',
          automargin: true,
          showlegend: false,
          hole: 0.5,
          textinfo: 'none',
        },
      ]}
      layout={{ width: 200, height: 200, margin: { t: 0, b: 10, l: 0, r: 0 } }}
    />
  );
};

export default DonutChart;
