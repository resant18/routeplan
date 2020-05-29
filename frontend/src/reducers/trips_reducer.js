import {
  RECEIVE_TRIPS,
  RECEIVE_USER_TRIPS,
  RECEIVE_TRIP,
  RECEIVE_NEW_TRIP,
  REMOVE_TRIP
} from "../actions/trip_actions";
import { RECEIVE_TRIP_POIS, REMOVE_TRIP_POIS } from "../actions/poi_actions";

const TripsReducer = (
  state = { all: {}, user: {}, selected: undefined },
  action
) => {
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
      delete newState.all[
        newState.all.indexOf(
          newState.all.filter(e => e._id === action.tripId)[0]
        )
      ];
      return newState;
    case (RECEIVE_TRIP_POIS, REMOVE_TRIP_POIS):
      newState.selected = action.trip.data;
      return newState;
    default:
      return state;
  }
};

export default TripsReducer;
