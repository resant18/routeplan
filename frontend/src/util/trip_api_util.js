import axios from 'axios';

export const getTrips = () => {
  return axios.get('/api/trips');
};

export const getUserTrips = id => {
  return axios.get(`/api/trips/user/${id}`);
};

export const createTrip = data => {
  return axios.post('/api/trips/', data);
};
