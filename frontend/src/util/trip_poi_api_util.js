import axios from 'axios';

export const addPoiToTrip = (data) => {
  return axios.get('/api/pois/new', data);
};
