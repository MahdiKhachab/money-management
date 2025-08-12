// src/api/reportService.js
import api from './api';

export const getMonthlyReport = (year, month) =>
  api.get('/reports/monthly', { params: { year, month } });

export const getAnnualReport = (year) =>
  api.get('/reports/annual', { params: { year } });

export const getIncomeBySource = (year) =>
  api.get('/reports/income-by-source', { params: { year } });

export const getExpenseByCategory = (year) =>
  api.get('/reports/expense-by-category', { params: { year } });
