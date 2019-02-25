import { createReducer } from "redux-starter-kit";
import { authenticate } from "../actions";

const authenticateReducer = (state: any, action: object): void => {
  state.isAuthenticated = true;
};

export default createReducer({ isAuthenticated: false }, {
  [authenticate.type]: authenticateReducer,
});
