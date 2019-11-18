import { getTrips, getUserTrips, writeTrip } from "../util/trip_api_util";

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_USER_TRIPS = "RECEIVE_USER_TRIPS";
export const RECEIVE_NEW_TRIP = "RECEIVE_NEW_TRIP";

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips
});

export const receiveUserTrips = trips => ({
  type: RECEIVE_USER_TRIPS,
  trips
});

export const receiveNewTrip = trip => ({
  type: RECEIVE_NEW_TRIP,
  trip
});

export const fetchTrips = () => dispatch =>
  getTrips()
    .then(trips => dispatch(receiveTrips(trips)))
    .catch(err => console.log(err));

export const fetchUserTrips = id => dispatch =>
  getUserTrips(id)
    .then(trips => dispatch(receiveUserTrips(trips)))
    .catch(err => console.log(err));

export const createTrip = data => dispatch =>
  writeTrip(data)
    .then(trip => dispatch(receiveNewTrip(trip)))
    .catch(err => console.log(err));
