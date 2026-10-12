import client from './client';

export const fetchIncomes = () => client.get('/incomes').then((res) => res.data);
export const fetchIncome = (id) => client.get(`/incomes/${id}`).then((res) => res.data);
export const createIncome = (income) => client.post('/incomes', income).then((res) => res.data);
export const updateIncome = (id, income) => client.put(`/incomes/${id}`, income).then((res) => res.data);
export const deleteIncome = (id) => client.delete(`/incomes/${id}`);
