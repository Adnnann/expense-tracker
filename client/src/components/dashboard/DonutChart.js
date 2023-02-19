import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';
const DonutChart = ({ income, expense }) => {
  // plotly package will be used for all charts in the project
  const Plot = createPlotlyComponent(Plotly);
  return (
    <Plot
      data={[
        {
          values: [income, expense],
          type: 'pie',
          marker: {
            colors: ['#00FF00', '#FF0000'],
          },
          automargin: true,
          showlegend: false,
          hole: 0.5,
          textinfo: 'none',
          labels: ['Income', 'Expense'],
          hoverinfo: 'label+value',
          textinfo: 'label+percent',
        },
      ]}
      layout={{ width: 200, height: 200, margin: { t: 0, b: 10, l: 0, r: 0 } }}
    />
  );
};

export default DonutChart;
