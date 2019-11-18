import { combineReducers } from 'redux';
import session from './session_reducer';
// import trips from './trips_reducer';
import errors from './error_reducer';

const RootReducer = combineReducers({
  session,
  // trips,
  errors
});

export default RootReducer;
