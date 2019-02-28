import { createReducer } from "redux-starter-kit";
import { authenticate, setCurrentUser } from "../actions";

export interface IReduxAuthentication {
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
  };
}
const authenticateReducer = (authentication: IReduxAuthentication, action: any): any => {
  authentication.isAuthenticated = true;
};

const setCurrentUserReducer = (authentication: IReduxAuthentication, action: any): any => {
  authentication.user = action.payload;
};

export default createReducer({ isAuthenticated: false }, {
  [authenticate.type]: authenticateReducer,
  [setCurrentUser.type]: setCurrentUserReducer,
});
