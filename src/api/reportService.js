// src/api/reportService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports';

export const getMonthlyReport = (year, month) =>
  axios.get(`${API_URL}/monthly`, { params: { year, month } });

export const getAnnualReport = (year) =>
  axios.get(`${API_URL}/annual`, { params: { year } });

export const getIncomeBySource = (year) =>
  axios.get(`${API_URL}/income-by-source`, { params: { year } });

export const getExpenseByCategory = (year) =>
  axios.get(`${API_URL}/expense-by-category`, { params: { year } });
