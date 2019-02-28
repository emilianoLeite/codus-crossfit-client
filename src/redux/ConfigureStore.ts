import { createBrowserHistory } from "history";
import { createStore } from "redux";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

export default function configureStore(preloadedState = {}) {
  return createStore(
   createRootReducer(history),
   preloadedState,
   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
   (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
 );
}
