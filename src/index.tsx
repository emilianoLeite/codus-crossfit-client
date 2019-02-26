
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import configureStore from "./redux/ConfigureStore";
import * as serviceWorker from "./serviceWorker";

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
