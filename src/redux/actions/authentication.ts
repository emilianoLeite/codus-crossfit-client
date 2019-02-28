import { createAction } from "redux-starter-kit";

const authenticate = createAction("AUTHENTICATE");
const setCurrentUser = createAction("SAVE_CURRENT_USER");

export { authenticate, setCurrentUser };
