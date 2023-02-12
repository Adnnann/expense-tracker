import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@material-ui/core/Typography';
import { Box } from '@mui/material';
import DonutChart from '../dashboard/DonutChart';
import {
  getUserTransactions,
  getCurrencyExchangeRate,
  setCurrencyExchangeRate,
  getGroupingVar,
  getCurrency,
  setCurrency,
  getCurrencyExchangeRates,
} from '../../features/usersSlice';
import { DateTime } from 'luxon';
import date from 'date-and-time';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const LeftPanelTransactions = () => {
  const dispatch = useDispatch();
  const userTransactions = useSelector(getUserTransactions);
  const currency = useSelector(getCurrency);
  const currencyExchangeRate = useSelector(getCurrencyExchangeRate);
  const groupingVar = useSelector(getGroupingVar);
  const currencyExchangeRatesForEURandUSD = useSelector(getCurrencyExchangeRates)

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
  //based on user selection of currency use appropriate coeficients to show all data in differenct currencies. Default values is BAM, hence multiple by one.
  const handleChange = (event) => {
    dispatch(setCurrency(event.target.value));
    switch (event.target.value) {
      case 'BAM':
        dispatch(setCurrencyExchangeRate(1));
        break;
      case 'USD':
        dispatch(setCurrencyExchangeRate(currencyExchangeRatesForEURandUSD[0].USD));
        break;
      case 'EUR':
        dispatch(setCurrencyExchangeRate(currencyExchangeRatesForEURandUSD[0].EUR));
        break;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        component='p'
        style={{
          textAlign: 'center',
          color:
            //if only there were expenses or expenses are higher than income
            //color in red, otherwise in green. To compare which one is higher
            //first check if both incomes and expenses exist so that application
            //do not fall apart
            userTransactions?.transactions
              ? _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'income',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .isEmpty()
                  .value() &&
                _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'expense',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .isEmpty()
                  .value()
                ? '0'
                : _.chain(
                    Object.values(userTransactions.transactions).filter(
                      (item) => item.type === 'income',
                    ),
                  )
                    .filter(
                      groupingVar === 'day'
                        ? { day: `${date.format(new Date(), 'dddd')}` }
                        : groupingVar === 'week'
                        ? { week: `Week ${DateTime.now().weekNumber}` }
                        : groupingVar === 'month'
                        ? { month: `${date.format(new Date(), 'MMM')}` }
                        : groupingVar === 'year'
                        ? { year: `${date.format(new Date(), 'YYYY')}` }
                        : null,
                    )
                    .groupBy(`${groupingVar}`)
                    .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .isEmpty()
                    .value()
                ? 'red'
                : _.chain(
                    Object.values(userTransactions.transactions).filter(
                      (item) => item.type === 'expense',
                    ),
                  )
                    .filter(
                      groupingVar === 'day'
                        ? { day: `${date.format(new Date(), 'dddd')}` }
                        : groupingVar === 'week'
                        ? { week: `Week ${DateTime.now().weekNumber}` }
                        : groupingVar === 'month'
                        ? { month: `${date.format(new Date(), 'MMM')}` }
                        : groupingVar === 'year'
                        ? { year: `${date.format(new Date(), 'YYYY')}` }
                        : null,
                    )
                    .groupBy(`${groupingVar}`)
                    .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .isEmpty()
                    .value()
                ? 'green'
                : _.chain(
                    Object.values(userTransactions.transactions).filter(
                      (item) => item.type === 'income',
                    ),
                  )
                    .filter(
                      groupingVar === 'day'
                        ? { day: `${date.format(new Date(), 'dddd')}` }
                        : groupingVar === 'week'
                        ? { week: `Week ${DateTime.now().weekNumber}` }
                        : groupingVar === 'month'
                        ? { month: `${date.format(new Date(), 'MMM')}` }
                        : groupingVar === 'year'
                        ? { year: `${date.format(new Date(), 'YYYY')}` }
                        : null,
                    )
                    .groupBy(`${groupingVar}`)
                    .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .value()[0][1] <
                  _.chain(
                    Object.values(userTransactions.transactions).filter(
                      (item) => item.type === 'expense',
                    ),
                  )
                    .filter(
                      groupingVar === 'day'
                        ? { day: `${date.format(new Date(), 'dddd')}` }
                        : groupingVar === 'week'
                        ? { week: `Week ${DateTime.now().weekNumber}` }
                        : groupingVar === 'month'
                        ? { month: `${date.format(new Date(), 'MMM')}` }
                        : groupingVar === 'year'
                        ? { year: `${date.format(new Date(), 'YYYY')}` }
                        : null,
                    )
                    .groupBy(`${groupingVar}`)
                    .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .value()[0][1]
                ? 'red'
                : 'black'
              : 'Loading',
        }}
      >
        <span style={{ color: 'black', fontWeight: 'bold' }}>Total Balance </span>
        <br />

        {
          //filter data and then summarize
          Object.keys(userTransactions).length !== 0
            ? // check if data exist and in case expenses do not exists
              //display only income data and vice verse
              _.chain(
                Object.values(userTransactions.transactions).filter(
                  (item) => item.type === 'income',
                ),
              )
                .filter(
                  groupingVar === 'day'
                    ? { day: `${date.format(new Date(), 'dddd')}` }
                    : groupingVar === 'week'
                    ? { week: `Week ${DateTime.now().weekNumber}` }
                    : groupingVar === 'month'
                    ? { month: `${date.format(new Date(), 'MMM')}` }
                    : groupingVar === 'year'
                    ? { year: `${date.format(new Date(), 'YYYY')}` }
                    : null,
                )
                .groupBy(`${groupingVar}`)
                .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                .toPairs()
                .isEmpty()
                .value() &&
              _.chain(
                Object.values(userTransactions.transactions).filter(
                  (item) => item.type === 'expense',
                ),
              )
                .filter(
                  groupingVar === 'day'
                    ? { day: `${date.format(new Date(), 'dddd')}` }
                    : groupingVar === 'week'
                    ? { week: `Week ${DateTime.now().weekNumber}` }
                    : groupingVar === 'month'
                    ? { month: `${date.format(new Date(), 'MMM')}` }
                    : groupingVar === 'year'
                    ? { year: `${date.format(new Date(), 'YYYY')}` }
                    : null,
                )
                .groupBy(`${groupingVar}`)
                .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                .toPairs()
                .isEmpty()
                .value()
              ? '0'
              : _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'expense',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .isEmpty()
                  .value()
              ? intToString(
                  (
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'income',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] * currencyExchangeRate
                  ).toFixed(2),
                )
              : _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'income',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .isEmpty()
                  .value()
              ? //if there were only expenses add - before the total available balance
                `- ${intToString(
                  (
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'expense',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] * currencyExchangeRate
                  ).toFixed(2),
                )}`
              : //in case expenses higher than incomes add - before the total available balance
              _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'income',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .value()[0][1] <
                _.chain(
                  Object.values(userTransactions.transactions).filter(
                    (item) => item.type === 'expense',
                  ),
                )
                  .filter(
                    groupingVar === 'day'
                      ? { day: `${date.format(new Date(), 'dddd')}` }
                      : groupingVar === 'week'
                      ? { week: `Week ${DateTime.now().weekNumber}` }
                      : groupingVar === 'month'
                      ? { month: `${date.format(new Date(), 'MMM')}` }
                      : groupingVar === 'year'
                      ? { year: `${date.format(new Date(), 'YYYY')}` }
                      : null,
                  )
                  .groupBy(`${groupingVar}`)
                  .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                  .toPairs()
                  .value()[0][1]
              ? `- ${intToString(
                  (
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'income',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] *
                      currencyExchangeRate -
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'expense',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] *
                      currencyExchangeRate
                  ).toFixed(2),
                )}`
              : //incomes higher than expenses and both exists, subtract expenses from incomes
                intToString(
                  (
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'income',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] *
                      currencyExchangeRate -
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'expense',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`${groupingVar}`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .value()[0][1] *
                      currencyExchangeRate
                  ).toFixed(2),
                )
            : ''
        }
      </Typography>

      <span>
        <div style={{ display: 'inline-flex', marginBottom: '5px' }}>
          <FormControl>
            <InputLabel variant='standard' htmlFor='currency'>
              Currency
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: 'currency',
                id: 'currency',
              }}
              value={currency}
              onChange={handleChange}
            >
              <option value={'BAM'}>BAM</option>
              <option value={'USD'}>$</option>
              <option value={'EUR'}>€</option>
            </NativeSelect>
          </FormControl>
        </div>
      </span>

      {Object.keys(userTransactions).length !== 0 &&
      Object.values(userTransactions.transactions).length !== 0 ? (
        <DonutChart
          //group and summarize data to get expense and incomes.
          income={
            _.chain(
              Object.values(userTransactions.transactions).filter((item) => item.type === 'income'),
            )
              .filter(
                groupingVar === 'day'
                  ? { day: `${date.format(new Date(), 'dddd')}` }
                  : groupingVar === 'week'
                  ? { week: `Week ${DateTime.now().weekNumber}` }
                  : groupingVar === 'month'
                  ? { month: `${date.format(new Date(), 'MMM')}` }
                  : groupingVar === 'year'
                  ? { year: `${date.format(new Date(), 'YYYY')}` }
                  : null,
              )
              .groupBy('income')
              .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              .toPairs()
              .map((item) => item[1] * currencyExchangeRate)
              .value()[0]
          }
          expense={
            _.chain(
              Object.values(userTransactions.transactions).filter(
                (item) => item.type === 'expense',
              ),
            )
              .filter(
                groupingVar === 'day'
                  ? { day: `${date.format(new Date(), 'dddd')}` }
                  : groupingVar === 'week'
                  ? { week: `Week ${DateTime.now().weekNumber}` }
                  : groupingVar === 'month'
                  ? { month: `${date.format(new Date(), 'MMM')}` }
                  : groupingVar === 'year'
                  ? { year: `${date.format(new Date(), 'YYYY')}` }
                  : null,
              )
              .groupBy(`expense`)
              .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              .toPairs()
              .map((item) => item[1] * currencyExchangeRate)
              .value()[0]
          }
          ratio={
            //Divide expenses by incomes to get ratio
            _.chain(
              Object.values(userTransactions.transactions).filter((item) => item.type === 'income'),
            )
              .filter(
                groupingVar === 'day'
                  ? { day: `${date.format(new Date(), 'dddd')}` }
                  : groupingVar === 'week'
                  ? { week: `Week ${DateTime.now().weekNumber}` }
                  : groupingVar === 'month'
                  ? { month: `${date.format(new Date(), 'MMM')}` }
                  : groupingVar === 'year'
                  ? { year: `${date.format(new Date(), 'YYYY')}` }
                  : null,
              )
              .groupBy('expense')
              .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              .toPairs()
              .map((item) => item[1] * currencyExchangeRate)
              .value()[0] /
            _.chain(
              Object.values(userTransactions.transactions).filter(
                (item) => item.type === 'expense',
              ),
            )
              .filter(
                groupingVar === 'day'
                  ? { day: `${date.format(new Date(), 'dddd')}` }
                  : groupingVar === 'week'
                  ? { week: `Week ${DateTime.now().weekNumber}` }
                  : groupingVar === 'month'
                  ? { month: `${date.format(new Date(), 'MMM')}` }
                  : groupingVar === 'year'
                  ? { year: `${date.format(new Date(), 'YYYY')}` }
                  : null,
              )
              .groupBy(`income`)
              .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
              .toPairs()
              .map((item) => item[1] * currencyExchangeRate)
              .value()[0]
              ? (
                  (_.chain(
                    Object.values(userTransactions.transactions).filter(
                      (item) => item.type === 'expense',
                    ),
                  )
                    .filter(
                      groupingVar === 'day'
                        ? { day: `${date.format(new Date(), 'dddd')}` }
                        : groupingVar === 'week'
                        ? { week: `Week ${DateTime.now().weekNumber}` }
                        : groupingVar === 'month'
                        ? { month: `${date.format(new Date(), 'MMM')}` }
                        : groupingVar === 'year'
                        ? { year: `${date.format(new Date(), 'YYYY')}` }
                        : null,
                    )
                    .groupBy('expense')
                    .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                    .toPairs()
                    .map((item) => item[1] * currencyExchangeRate)
                    .value()[0] /
                    _.chain(
                      Object.values(userTransactions.transactions).filter(
                        (item) => item.type === 'income',
                      ),
                    )
                      .filter(
                        groupingVar === 'day'
                          ? { day: `${date.format(new Date(), 'dddd')}` }
                          : groupingVar === 'week'
                          ? { week: `Week ${DateTime.now().weekNumber}` }
                          : groupingVar === 'month'
                          ? { month: `${date.format(new Date(), 'MMM')}` }
                          : groupingVar === 'year'
                          ? { year: `${date.format(new Date(), 'YYYY')}` }
                          : null,
                      )
                      .groupBy(`income`)
                      .mapValues((entries) => _.sumBy(entries, 'amountInBAM'))
                      .toPairs()
                      .map((item) => item[1] * currencyExchangeRate)
                      .value()[0]) *
                  100
                ).toFixed(2) + '%'
              : '0'
          }
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default LeftPanelTransactions;
