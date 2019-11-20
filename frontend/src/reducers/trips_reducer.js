import {
  RECEIVE_TRIPS,
  RECEIVE_USER_TRIPS,
  RECEIVE_NEW_TRIP,
  REMOVE_TRIP
} from "../actions/trip_actions";

const TripsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_TRIPS:
            return action.trips;
        case RECEIVE_USER_TRIPS:
            return action.trips;
        case RECEIVE_NEW_TRIP:
            nextState[action.trip.id] = action.trip;
            return nextState;
        case REMOVE_TRIP:
            delete nextState[action.tripId];
            return nextState;
        default:
            return oldState;
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
