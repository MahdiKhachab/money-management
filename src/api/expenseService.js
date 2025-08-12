
import api from './api';

export const fetchExpenses = () => api.get('/expenses');

export const createExpense = (expenseData) => api.post('/expenses', expenseData);

export const deleteExpense = (id) => api.delete(`/expenses/v1/delete/${id}`);
