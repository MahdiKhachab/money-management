import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const createDonor = (donorData) => {
  return axios.post(`${API_BASE_URL}/donors`, donorData);
};

export const fetchDonors = () => {
  return axios.get(`${API_BASE_URL}/donors`);
};


export const deleteDonor = (id) => axios.delete('/api/donors/${id}');