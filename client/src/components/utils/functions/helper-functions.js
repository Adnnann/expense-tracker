import { DateTime } from 'luxon';
import date from 'date-and-time';

export const intToString = (num) => {

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

  return intToString(num * currencyRate)

}

  //function to calculate total incomes and expenses for selected period
  //and to display them in chart
  export const calculateTotalIncomesAndExpenses = (data, groupingVarForCharts, type) => {
    console.log('data',data)
    
    const result = data
      .filter((item) =>
        groupingVarForCharts === 'week'
          ? item.week === `Week ${DateTime.now().weekNumber}`
          : groupingVarForCharts === 'month'
          ? item.month === `${date.format(new Date(), 'MMM')}`
          : groupingVarForCharts === 'year'
          ? item.year === `${date.format(new Date(), 'YYYY')}`
          : null,
      )
      .reduce((group, item) => {
        const { type } = item;
        group[type] = group[type] ?? [];
        group[type].push(item.amountInBAM);
        return group;
      }, {});
    console.log('resu;t',result)
    if(result.income === undefined && result.expense === undefined){
      return (result.income = 0, result.expense = 0)
    }else if(result.expense === undefined){
      return result.expense = 0
    }else if(result.expense === undefined){
     return (result.income = 0, result.expense = 0)
    }else{
      return type === 'income'
      ? result.income.reduce((acc, item) => acc + item, 0)
      : result.expense.reduce((acc, item) => acc + item, 0);
    }


  };

export const calculateIncomesAndExpenses = (data, type, groupingVar, currencyRate) => {
  //if no incomes are present then return 0
    //if no expenses are present then return 0
    //if both are present then return income - expenses
    return console.log(intToString(data.filter(item=>item.type === type).length === 0 ? 0 
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
    .reduce((acc, item) => acc + item.amountInBAM, 0) * currencyRate));
  }