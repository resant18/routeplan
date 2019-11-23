import axios from 'axios';

export const addPoiToTrip = (data) => {
  debugger
  return axios.post('/api/pois/new', data);
};
