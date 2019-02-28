import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";

export default (history: any) => combineReducers({
  authentication: AuthenticationReducer,
  router: connectRouter(history),
});
