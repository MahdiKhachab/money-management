import client from './client';

export const fetchExpenses = () => client.get('/expenses').then((res) => res.data);
export const fetchExpense = (id) => client.get(`/expenses/${id}`).then((res) => res.data);
export const createExpense = (expense) => client.post('/expenses', expense).then((res) => res.data);
export const updateExpense = (id, expense) => client.put(`/expenses/${id}`, expense).then((res) => res.data);
export const deleteExpense = (id) => client.delete(`/expenses/${id}`);
