import {
  RECEIVE_TRIPS,
  RECEIVE_USER_TRIPS,
  RECEIVE_NEW_TRIP,
  REMOVE_TRIP
} from "../actions/trip_actions";

const TripsReducer = ( state = { all: {}, user: {}, new: undefined }, action ) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_TRIPS:
        newState.all = action.trip.data
        return newState;      
    case RECEIVE_USER_TRIPS:
        newState.user = action.trips.data
        return newState;      
    case RECEIVE_NEW_TRIP:
        newState.new = action.trips.data      
        return newState;
    case REMOVE_TRIP:
        delete newState[action.tripId];
        return newState;
    default:
        return state;
  }
};

export default TripsReducer;

// const TripsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
//   Object.freeze(state);
//   let newState = Object.assign({}, state);
//   switch (action.type) {
//     case RECEIVE_TRIPS:
//       newState.all = action.trips.data;
//       return newState;
//     case RECEIVE_USER_TRIPS:
//       newState.user = action.trips.data;
//       return newState;
//     case RECEIVE_NEW_TRIP:
//       newState.new = action.trip.data;
//       return newState;
//     default:
//       return state;
//   }
// };

// export default TripsReducer;
