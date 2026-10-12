import client from './client';

export const fetchMaintenances = () => client.get('/maintenances').then((res) => res.data);
export const fetchMaintenance = (id) => client.get(`/maintenances/${id}`).then((res) => res.data);
export const createMaintenance = (item) => client.post('/maintenances', item).then((res) => res.data);
export const updateMaintenance = (id, item) => client.put(`/maintenances/${id}`, item).then((res) => res.data);
export const deleteMaintenance = (id) => client.delete(`/maintenances/${id}`);
