// src/api/incomeService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/incomes';

export const fetchIncomes = () => axios.get(API_URL);
export const createIncome = (incomeData) => axios.post(API_URL, incomeData);
