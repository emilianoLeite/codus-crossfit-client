import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";
import { authenticate } from "../actions";

const authenticateReducer = (isAuthenticated: boolean, action: object): any => {
  return true;
};

const mainReducer = createReducer(false, {
  [authenticate.type]: authenticateReducer,
});

export default (history: any) => combineReducers({
  isAuthenticated: mainReducer,
  router: connectRouter(history),
});
