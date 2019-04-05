import { createReducer, AnyAction } from "redux-starter-kit";
import { authenticate, setCurrentUser } from "../actions";

export interface IReduxAuthentication {
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
  };
}
const authenticateReducer = (authentication: IReduxAuthentication): void => {
  authentication.isAuthenticated = true;
};

const setCurrentUserReducer = (authentication: IReduxAuthentication, action: AnyAction): void => {
  authentication.user = action.payload;
};

export default createReducer({ isAuthenticated: false }, {
  [authenticate.type]: authenticateReducer,
  [setCurrentUser.type]: setCurrentUserReducer,
});
