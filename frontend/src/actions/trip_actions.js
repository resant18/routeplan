import * as APIUtil from "../util/trip_api_util";

export const RECEIVE_TRIP = "RECEIVE_TRIP";
export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_USER_TRIPS = "RECEIVE_USER_TRIPS";
export const RECEIVE_NEW_TRIP = "RECEIVE_NEW_TRIP";
export const REMOVE_TRIP = "REMOVE_TRIP";
export const RECEIVE_TRIP_ERRORS = "RECEIVE_TRIP_ERRORS";

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

export const receiveUserTrips = trips => ({
  type: RECEIVE_USER_TRIPS,
  trips
});

export const receiveTrip = trip => ({
  type: RECEIVE_TRIP,
  trip
});

export const receiveNewTrip = trip => ({
  type: RECEIVE_NEW_TRIP,
  trip
});

export const removeTrip = (tripId, response) => ({
  type: REMOVE_TRIP,
  tripId,
  result: response
});

export const receiveTripErrors = errors => ({
  type: RECEIVE_TRIP_ERRORS,
  errors
});

// thunk action creators
export const fetchTrips = () => dispatch =>
  APIUtil.getAllTrips()
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => console.log(err));

export const fetchUserTrips = (userId, page) => dispatch => {  
  return APIUtil.getUserTrips(userId, page)
    .then(trips => dispatch(receiveUserTrips(trips)))
    .catch(err => console.log(err));
}

export const fetchTrip = tripId => dispatch =>
  APIUtil.getTrip(tripId)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => console.log(err));

export const createTrip = data => dispatch =>
  APIUtil.makeTrip(data)
    .then(trip => dispatch(receiveNewTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err)));

export const editTrip = data => dispatch => {
  return APIUtil.updateTrip(data)
    .then(trip => dispatch(receiveTrip(trip)))
    .catch(err => dispatch(receiveTripErrors(err)));
};

export const destroyTrip = dataId => dispatch => {
  return APIUtil.deleteTrip(dataId)
     .then((response) => {     
       return dispatch(removeTrip(dataId, response))
      })
     .catch((err) => dispatch(receiveTripErrors(err)));
};
