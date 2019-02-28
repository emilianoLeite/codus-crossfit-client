import { createReducer } from "redux-starter-kit";
import { authenticate } from "../actions";

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

export default createReducer({ isAuthenticated: false }, {
  [authenticate.type]: authenticateReducer,
});
