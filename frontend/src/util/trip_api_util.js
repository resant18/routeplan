import axios from "axios";

export const getAllTrips = () => {
  return axios.get("/api/trips");
};

export const getUserTrips = (userId, page) => {    
  return axios.get(`/api/trips/user/${userId}`, {
    params: {
      page: page
    }
  });
};

export const getTrip = tripId => {
  return axios.get(`/api/trips/${tripId}`);
};

export const makeTrip = data => {
  return axios.post("/api/trips/new", data);
};

export const updateTrip = data => {
  return axios.patch(`/api/trips/${data.id}`, data);
};

export const deleteTrip = dataId => {
  return axios.delete(`/api/trips/${dataId}`, dataId)
  .then(response => response)
  .catch(error =>  error )
};
