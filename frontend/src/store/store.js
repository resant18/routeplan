import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers/root_reducer";

// for testing env
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState = {}) => {
  const hostname = window && window.location && window.location.hostname;

  // store for testing environment
  if (/localhost/.test(hostname)) {
     return createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk, logger)));
  }
  // store for production environment
  else {
     return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
  }
}

export default configureStore;
