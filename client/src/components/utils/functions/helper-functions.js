import { DateTime } from 'luxon';
import date from 'date-and-time';

export const intToString = (num) => {
  console.log(num)
  if (num < 0) {
    num = `-${num.toString().replace(/[^0-9.]/g, '')}`;
  } else {
    num = num.toString().replace(/[^0-9.]/g, '');
  }

  if (num > 0 && num < 1000) {
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

console.log(intToString(-100))
export const calculateTotal = (data, groupingVar, currencyRate) => {
  //if no incomes are present then return 0
  //if no expenses are present then return 0
  //if both are present then return income - expenses

  const income = data.filter(item=>item.type === 'income').length === 0 ? 0 
  : data.filter(item=>item.type === 'income')
  .filter(item => 
                  groupingVar === 'day'
                  ? item.day === `${date.format(new Date(), 'dddd')}` 
                  : groupingVar === 'week'
                  ? item.week === `Week ${DateTime.now().weekNumber}` 
                  : groupingVar === 'month'
                  ? item.month === `${date.format(new Date(), 'MMM')}` 
                  : groupingVar === 'year'
                  ? item.year === `${date.format(new Date(), 'YYYY')}` 
                  : item === item,
              )
  .reduce((acc, item) => acc + item.amountInBAM, 0) 

  const expense = data.filter(item=>item.type === 'expense').length === 0 ? 0
  : data.filter(item=>item.type === 'expense')
  .filter(item => 
                  groupingVar === 'day'
                  ? item.day === `${date.format(new Date(), 'dddd')}` 
                  : groupingVar === 'week'
                  ? item.week === `Week ${DateTime.now().weekNumber}` 
                  : groupingVar === 'month'
                  ? item.month === `${date.format(new Date(), 'MMM')}` 
                  : groupingVar === 'year'
                  ? item.year === `${date.format(new Date(), 'YYYY')}` 
                  : item === item,
              )
  .reduce((acc, item) => acc + item.amountInBAM, 0)

  const num = income - expense

  return intToString(num)

}
export const calculateIncomesAndExpenses = (data, type, groupingVar, currencyRate) => {
    console.log(data, type, groupingVar, currencyRate)
  //if no incomes are present then return 0
    //if no expenses are present then return 0
    //if both are present then return income - expenses
    return intToString(data.filter(item=>item.type === type).length === 0 ? 0 
    : data
    .filter(item=>item.type === type)
    .filter(item => 
                    groupingVar === 'day'
                    ? item.day === `${date.format(new Date(), 'dddd')}` 
                    : groupingVar === 'week'
                    ? item.week === `Week ${DateTime.now().weekNumber}` 
                    : groupingVar === 'month'
                    ? item.month === `${date.format(new Date(), 'MMM')}` 
                    : groupingVar === 'year'
                    ? item.year === `${date.format(new Date(), 'YYYY')}` 
                    : item === item,
                )
    .reduce((acc, item) => acc + item.amountInBAM, 0) * currencyRate);
  }