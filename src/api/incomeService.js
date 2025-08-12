// src/api/incomeService.js
import api from './api';

export const fetchIncomes = () => api.get('/incomes');
export const createIncome = (incomeData) => api.post('/incomes', incomeData);
export const deleteIncome = (id) => api.delete(`/incomes/${id}`);
