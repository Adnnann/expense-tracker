import { DateTime } from 'luxon';
import date from 'date-and-time';
export const calculateIncomesAndExpenses = (data, type, groupingVar) => {
    //if no incomes are present then return 0
    //if no expenses are present then return 0
    //if both are present then return income - expenses
    return data.filter(item=>item.type === type).length === 0 ? 0 
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
    .reduce((acc, item) => acc + item.amountInBAM, 0)
  }