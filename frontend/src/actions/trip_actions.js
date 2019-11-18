import { getTrips, getUserTrips, writeTrip } from "../util/trip_api_util";

export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_USER_TRIPS = "RECEIVE_USER_TRIPS";
export const RECEIVE_NEW_TRIP = "RECEIVE_NEW_TRIP";

export const receiveTrips = tweets => ({
  type: RECEIVE_TRIPS,
  tweets
});

export const receiveUserTrips = tweets => ({
  type: RECEIVE_USER_TRIPS,
  tweets
});

export const receiveNewTrip = tweet => ({
  type: RECEIVE_NEW_TRIP,
  tweet
});

export const fetchTrips = () => dispatch =>
  getTrips()
    .then(tweets => dispatch(receiveTrips(tweets)))
    .catch(err => console.log(err));

export const fetchUserTrips = id => dispatch =>
  getUserTrips(id)
    .then(tweets => dispatch(receiveUserTrips(tweets)))
    .catch(err => console.log(err));

export const composeTrip = data => dispatch =>
  writeTrip(data)
    .then(tweet => dispatch(receiveNewTrip(tweet)))
    .catch(err => console.log(err));
