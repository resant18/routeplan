import axios from 'axios';

export const getTrips = () => {
  return axios.get('/api/trips');
};

export const getUserTrips = id => {
  return axios.get(`/api/trips/user/${id}`);
};

export const makeTrip = data => {
  return axios.post('/api/trips/', data);
};
