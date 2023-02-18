import Typography from '@material-ui/core/Typography';

export default function LeftSidePanelData({ data, intToString, selectedExchangeRate }) {
  return (
    <div style={{ display: 'inline-flex' }}>
      <Typography
        variant='h5'
        style={{
          display: 'inline-flex',
          marginTop: '10px',
          marginLeft: '5px',
          color:
            _.chain(data.filter((item) => item.type === 'income'))
              .isEmpty()
              .value() &&
            _.chain(data.filter((item) => item.type === 'expense'))
              .isEmpty()
              .value()
              ? 'black'
              : _.chain(data.filter((item) => item.type === 'income'))
                  .isEmpty()
                  .value()
              ? 'red'
              : _.chain(data.filter((item) => item.type === 'expense'))
                  .isEmpty()
                  .value()
              ? 'green'
              : _.chain(data.filter((item) => item.type === 'income'))
                  .sumBy('amountInBAM')
                  .value() <
                _.chain(data.filter((item) => item.type === 'expense'))
                  .sumBy('amountInBAM')
                  .value()
              ? 'red'
              : 'black',
        }}
      >
        {
          //filter and sumby grouped data to get total sum of all transactions. Filter data to show only incomes or only expenses based on user input
          //if either expenses or incomes do not exit show data that are available (either incomes or expense)
          _.chain(data.filter((item) => item.type === 'income'))
            .isEmpty()
            .value() &&
          _.chain(data.filter((item) => item.type === 'expense'))
            .isEmpty()
            .value()
            ? '0'
            : _.chain(data.filter((item) => item.type === 'income'))
                .isEmpty()
                .value()
            ? `- ${intToString(
                (
                  _.chain(data.filter((item) => item.type === 'expense'))
                    .sumBy('amountInBAM')
                    .value() * selectedExchangeRate
                ).toFixed(2),
              )} `
            : _.chain(data.filter((item) => item.type === 'expense'))
                .isEmpty()
                .value()
            ? intToString(
                (
                  _.chain(data.filter((item) => item.type === 'income'))
                    .sumBy('amountInBAM')
                    .value() * selectedExchangeRate
                ).toFixed(2),
              )
            : //if income smaller than expense show - before the total sum
            _.chain(data.filter((item) => item.type === 'income'))
                .sumBy('amountInBAM')
                .value() <
              _.chain(data.filter((item) => item.type === 'expense'))
                .sumBy('amountInBAM')
                .value()
            ? `- ${intToString(
                (
                  _.chain(data.filter((item) => item.type === 'income'))
                    .sumBy('amountInBAM')
                    .value() *
                    selectedExchangeRate -
                  _.chain(data.filter((item) => item.type === 'expense'))
                    .sumBy('amountInBAM')
                    .value() *
                    selectedExchangeRate
                ).toFixed(2),
              )}`
            : // If incomes higher than expenses just subtract expenses from incomes
              intToString(
                (
                  _.chain(data.filter((item) => item.type === 'income'))
                    .sumBy('amountInBAM')
                    .value() *
                    selectedExchangeRate.BAM -
                  _.chain(data.filter((item) => item.type === 'expense'))
                    .sumBy('amountInBAM')
                    .value() *
                    selectedExchangeRate
                ).toFixed(2),
              )
        }
      </Typography>
    </div>
  );
}
