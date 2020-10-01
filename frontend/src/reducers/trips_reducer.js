import {
  RECEIVE_TRIPS,
  RECEIVE_USER_TRIPS,
  RECEIVE_TRIP,
  RECEIVE_NEW_TRIP,
  REMOVE_TRIP
} from "../actions/trip_actions";
import { RECEIVE_TRIP_POIS, REMOVE_TRIP_POIS } from "../actions/poi_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";

const initialState = { all: {}, user: {}, selected: undefined };

const TripsReducer = (state = initialState, action) => {
   Object.freeze(state);
   let newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_TRIP:
         newState.selected = action.trip.data;
         return newState;
      case RECEIVE_TRIPS:
         newState.all = action.trips.data;
         return newState;
      case RECEIVE_USER_TRIPS:
         newState.user = action.trips.data;
         return newState;
      case RECEIVE_NEW_TRIP:
         newState.selected = action.trip.data;
         return newState;
      case REMOVE_TRIP:
         let deletedTrip = newState.user.filter((trip) => trip._id === action.tripId)[0];
         let deletedUserTripIdx = newState.user.indexOf(deletedTrip);
         delete newState.user[deletedUserTripIdx];
         return newState;
      case (RECEIVE_TRIP_POIS, REMOVE_TRIP_POIS):
         newState.selected = action.trip.data;
         return newState;
      case RECEIVE_USER_LOGOUT:
         return initialState;
      default:
         return state;
   }
};

export default TripsReducer;
