import { SHOW_MODAL, HIDE_MODAL } from "../actions/modal_actions";

export default (state = null, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return action.modal;
    case HIDE_MODAL:
      return null;
    default:
      return state;
  }
};
