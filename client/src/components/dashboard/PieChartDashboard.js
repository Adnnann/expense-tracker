import PieChart from './PieChart';
export default function PieChartDashboard({ data, selectedExchangeRate, filter }) {
  return (
    <PieChart
      //group and summarize data to get expenses and incomes
      income={
        _.chain(
          data,
          // data.filter(
          //   (item) => item.type === filter.income || item.type === filter.expense,
          // ),
        )
          .groupBy('type')
          .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
          .value().income
          ? (
              _.chain(
                data.filter((item) => item.type === filter.income || item.type === filter.expense),
              )
                .groupBy('type')
                .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                .value().income * selectedExchangeRate
            ).toFixed(2)
          : ''
      }
      expense={
        _.chain(data.filter((item) => item.type === filter.income || item.type === filter.expense))
          .groupBy('type')
          .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
          .value().expense
          ? (
              _.chain(
                data.filter((item) => item.type === filter.income || item.type === filter.expense),
              )
                .groupBy('type')
                .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                .value().expense * selectedExchangeRate
            ).toFixed(2)
          : ''
      }
    />
  );
}
