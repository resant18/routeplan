import { RECEIVE_USER } from "../actions/user_actions";

const UsersReducer = (state = {}, action) => {
  Object.freeze(state);
  // let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    default:
      return state;
  }
};

export default UsersReducer;
