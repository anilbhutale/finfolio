import React, { useState, useEffect } from 'react';
import Chart from '../../components/Chart';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';

import { Income, Expense, Balance } from '../../utils/Icons';
import { useGetAllTransactionsQuery } from '../../features/api/apiSlices/transactionApiSlice';

const DashboardPage = () => {
  const user = useSelector((state) => state.auth?.user?.username);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentHistory, setRecentHistory] = useState([]);

  const {
    data: transactions = [],
    error,
    isLoading,
  } = useGetAllTransactionsQuery();

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const incomes = transactions.filter(
        (txn) => txn.transaction_type === 'credit'
      );
      const expenses = transactions.filter(
        (txn) => txn.transaction_type === 'debit'
      );

      const totalIncome = incomes.reduce(
        (sum, txn) => sum + parseInt(txn.amount),
        0
      );
      const totalExpense = expenses.reduce(
        (sum, txn) => sum + parseInt(txn.amount),
        0
      );
      setTotalIncome(totalIncome);
      setTotalExpense(totalExpense);
      setTotalBalance(totalIncome - totalExpense);

      const recentHistory = [...incomes, ...expenses];
      recentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentHistory(recentHistory.slice(0, 3));
    }
  }, [transactions]);

  const allDates = [
    ...new Set([
      ...transactions
        .filter((txn) => txn.transaction_type === 'credit')
        .map((txn) => moment(txn.date).format('MM/DD/YYYY')),
      ...transactions
        .filter((txn) => txn.transaction_type === 'debit')
        .map((txn) => moment(txn.date).format('MM/DD/YYYY')),
    ]),
  ];

  const data = allDates.map((date) => {
    const incomeTotal = transactions
      .filter(
        (txn) =>
          txn.transaction_type === 'credit' &&
          moment(txn.date).format('MM/DD/YYYY') === date
      )
      .reduce((sum, txn) => sum + parseInt(txn.amount), 0);

    const expenseTotal = transactions
      .filter(
        (txn) =>
          txn.transaction_type === 'debit' &&
          moment(txn.date).format('MM/DD/YYYY') === date
      )
      .reduce((sum, txn) => sum + parseInt(txn.amount), 0);

    return {
      name: date,
      income: incomeTotal,
      expense: expenseTotal,
    };
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="w-full h-full md:h-[90vh] px-3 md:px-6">
      <ul></ul>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mt-3 text-center sm:text-left text-pretty">
        Hello, {user}😊
      </h2>
      <h3 className="font-outfit text-sm md:text-base lg:text-lg text-center sm:text-left text-pretty">
        See what's happening with your money, Let's manage your
        incomes/expenses.{' '}
        <span className="font-bold text-primary">Finance PortFolioly!</span>
      </h3>
      <div className="w-full mt-8 flex flex-col sm:flex-row gap-y-4 justify-between items-center">
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Balance</h4>
            <h4 className="text-2xl md:text-3xl mt-1">
              ₹
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalBalance}
                displayType={'text'}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Balance className="icon" />
        </div>
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Incomes</h4>
            <h4 className="text-2xl md:text-3xl text-emerald-400 mt-1">
              ₹
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalIncome}
                displayType={'text'}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Income className="icon" />
        </div>
        <div className="px-6 py-4 border-2 w-full sm:w-[30%] border-secondary rounded-lg inline-flex justify-between items-center">
          <div>
            <h4 className="font-outfit text-base md:text-lg">Total Expenses</h4>
            <h4 className="text-2xl md:text-3xl text-red-400 mt-1">
              ₹
              <NumericFormat
                className="ml-1 text-xl md:text-2xl"
                value={totalExpense}
                displayType={'text'}
                thousandSeparator={true}
              />
            </h4>
          </div>
          <Expense className="icon" />
        </div>
      </div>
      <div className="w-full h-full md:h-[60%] mt-4 md:flex gap-x-4 overflow-hidden">
        <div className="w-full md:w-[60%] h-[25rem] md:h-full flex flex-col justify-center items-center overflow-x-scroll">
          <h5 className="text-2xl">Activity</h5>
          <div className="min-w-[20rem] w-full h-full">
            <Chart data={data} />
          </div>
        </div>
        <div className="w-full md:w-[40%] my-12 md:my-0">
          <h5 className="text-2xl text-center md:text-left">
            Recent Transactions
          </h5>
          <ul className="space-y-4 mt-4">
            {recentHistory.length === 0 ? (
              <li key="no-transactions" className="text-gray-500">
                No recent transactions to display.
              </li>
            ) : (
              recentHistory.map((transaction) => (
                <li
                  key={transaction.id}
                  className="border-2 border-secondary rounded-lg px-3 py-4 flex justify-between items-center"
                >
                  <div className="flex gap-x-4">
                    {transaction.transaction_type === 'credit' ? (
                      <Income className="icon-second" />
                    ) : (
                      <Expense className="icon-second" />
                    )}
                    <div>
                      <h5 className="capitalize line">{transaction.title}</h5>
                      <h5 className="font-outfit text-gray-500 capitalize">
                        {transaction.transaction_type}
                      </h5>
                    </div>
                  </div>
                  <h5
                    className={`text-xl ${
                      transaction.transaction_type === 'credit'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    ₹{transaction.amount}
                  </h5>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
