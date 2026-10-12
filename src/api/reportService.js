import client from './client';

export const getMonthlyReport = (year, month) =>
  client.get('/reports/monthly', { params: { year, month } }).then((res) => res.data);

export const getAnnualReport = (year) =>
  client.get('/reports/annual', { params: { year } }).then((res) => res.data);

export const getIncomeBySource = (year) =>
  client.get('/reports/income-by-source', { params: { year } }).then((res) => res.data);

export const getExpenseByCategory = (year) =>
  client.get('/reports/expense-by-category', { params: { year } }).then((res) => res.data);
