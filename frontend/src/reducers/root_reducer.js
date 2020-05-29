import { combineReducers } from "redux";
import session from "./session_reducer";
import trips from "./trips_reducer";
import ui from "./ui_reducer";
import errors from "./error_reducer";
import users from "./users_reducer";

const RootReducer = combineReducers({
  users,
  session,
  trips,
  ui,
  errors
});

export default RootReducer;
