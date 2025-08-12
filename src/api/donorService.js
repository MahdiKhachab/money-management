// donorService.js
import api from './api';

export const createDonor = (donorData) => api.post('/donors', donorData);

export const fetchDonors = () => api.get('/donors');

export const deleteDonor = (id) => api.delete(`/donors/${id}`);
