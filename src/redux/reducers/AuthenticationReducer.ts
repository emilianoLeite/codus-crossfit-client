import { createReducer, PayloadAction } from "redux-starter-kit";
import { authenticate, setCurrentUser } from "../actions";

export interface IReduxAuthentication {
  isAuthenticated: boolean;
  user?: IReduxUser;
}

export interface IReduxUser {
  id: string;
  email: string;
  jwt: string;
}

export interface IReduxAuthenticationProps {
  authenticate: () => void;
  setCurrentUser: (user: IReduxUser) => void;
}

const authenticateReducer = (authentication: IReduxAuthentication): void => {
  authentication.isAuthenticated = true;
};

const setCurrentUserReducer = (authentication: IReduxAuthentication, action: PayloadAction<IReduxUser>): void => {
  authentication.user = action.payload;
};

export default createReducer({ isAuthenticated: false }, {
  [authenticate.type]: authenticateReducer,
  [setCurrentUser.type]: setCurrentUserReducer,
});
