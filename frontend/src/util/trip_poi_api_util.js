import axios from "axios";

export const addPoiToTrip = data => {
  return axios.post("/api/pois/new", data);
};

export const removePoiFromTrip = (tripId, poiId) => {
  return axios.delete(`/api/pois/${tripId}/${poiId}`, { tripId, poiId });
};
