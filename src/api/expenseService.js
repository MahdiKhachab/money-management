
// src/api/expenseService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expenses';

export const fetchExpenses = () => axios.get(API_URL);
export const createExpense = (expenseData) => axios.post(API_URL, expenseData);

