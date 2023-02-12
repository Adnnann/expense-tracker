import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import date from 'date-and-time';
import {
  getFilter,
  getUserTransactions,
  getCurrencyExchangeRate,
  getGroupingVar,
  setDeleteId,
  setOpenDeleteModal,
} from '../../features/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router';
import { DateTime } from 'luxon';

const RightPanelTransactions = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const userTransactions = useSelector(getUserTransactions);
  const currencyExchangeRate = useSelector(getCurrencyExchangeRate);
  const groupingVar = useSelector(getGroupingVar);
  const navigate = useNavigate();

  //define table columns
  const columns = [
    {
      id: 'recent',
      label: 'Recent',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'edit',
      minWidth: 50,
      align: 'left',
    },
  ];

  function createData(recent, amount, edit) {
    return { recent, amount, edit };
  }

  const rows = [];

  const dateDiff = (date2) => {
    let date1 = new Date();
    // date2 is data from database
    return date.isSameDay(date1, date2)
      ? Math.round(date.subtract(date1, date2).toHours(), 0) === 1
        ? Math.round(date.subtract(date1, date2).toHours(), 0) + ' hour ago'
        : Math.round(date.subtract(date1, date2).toHours(), 0) + ' hours ago'
      : date.format(date2, 'DD  MMMM YYYY');
  };

  // use abbreviation to display big numbers
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

  const editTransaction = (id) => {
    navigate(`/transaction/${id}`);
  };

  const deleteTransaction = (id) => {
    dispatch(setDeleteId(id));
    dispatch(setOpenDeleteModal(true));
  };

  if (Object.keys(userTransactions).length !== 0) {
    //use dateDiff on returned date values from database
    Object.values(userTransactions.transactions)
      .filter((item) => item.type === filter.income || item.type === filter.expense)
      //Filter data based on user input. Dispatch setGroupingVar action
      // will set desired filter
      .filter((item) =>
        groupingVar === 'day'
          ? item.day === `${date.format(new Date(), 'dddd')}`
          : groupingVar === 'week'
          ? item.week === `Week ${DateTime.now().weekNumber}`
          : groupingVar === 'month'
          ? item.month === `${date.format(new Date(), 'MMM')}`
          : groupingVar === 'year'
          ? item.year === `${date.format(new Date(), 'YYYY')}`
          : null,
      )
      .map((item) => {
        const firstRow = (
          <div>
            {item.title}
            <br />
            <span style={{ color: 'grey', fontSize: '10px' }}>
              {dateDiff(new Date(item.created))}
            </span>
          </div>
        );
        const secondRow = (
          <span style={{ color: item.type === 'income' ? 'green' : 'red' }}>
            {' '}
            {item.type === 'income'
              ? `+ ${intToString((item.amountInBAM * currencyExchangeRate).toFixed(2))}`
              : `- ${intToString((item.amountInBAM * currencyExchangeRate).toFixed(2))}`}
          </span>
        );

        // add third row (remove and edit buttons)
        const thirdRow = (
          <span style={{ marginLeft: '30%' }}>
            <EditOutlinedIcon
              fontSize='small'
              onClick={() => {
                editTransaction(item._id);
              }}
            />
            <DeleteOutlineOutlinedIcon
              onClick={() => deleteTransaction(item._id)}
              fontSize='small'
              style={{ marginLeft: '10%' }}
            />
          </span>
        );

        // generate rows
        rows.push(createData(firstRow, secondRow, thirdRow));
      });
  }

  return (
    <Paper sx={{ width: '98%', overflow: 'hidden', overflowX: 'none', wordBreak: 'break-all' }}>
      {Object.keys(userTransactions).length !== 0 &&
      Object.values(userTransactions.transactions).length < 1 ? (
        'Start adding transactions'
      ) : Object.keys(userTransactions).length !== 0 ? (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={Math.random() * 100}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: 'grey' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow
                    style={{ padding: '0 !important', height: '90px', wordBreak: 'break' }}
                    key={index}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={Math.random() * 10}
                          align={column.align}
                          style={{ wordBreak: 'break-all' }}
                        >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ''
      )}
    </Paper>
  );
};

export default RightPanelTransactions;
