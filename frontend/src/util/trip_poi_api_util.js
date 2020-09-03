import axios from "axios";

export const addPoiToTrip = data => {
  return axios.post("/api/pois/new", data);
};

export const removePoiFromTrip = data => {    
  return axios.delete(`/api/pois/${data.tripId}/${data.poiId}`, data);
};
