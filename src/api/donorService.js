import client from './client';

export const fetchDonors = () => client.get('/donors').then((res) => res.data);
export const fetchDonor = (id) => client.get(`/donors/${id}`).then((res) => res.data);
export const createDonor = (donor) => client.post('/donors', donor).then((res) => res.data);
export const updateDonor = (id, donor) => client.put(`/donors/${id}`, donor).then((res) => res.data);
export const deleteDonor = (id) => client.delete(`/donors/${id}`);
