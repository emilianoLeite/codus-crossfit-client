import React from "react";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { Store } from "redux";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import WipChallenges from "./components/WipChallenges";
import client from "./graphql/client";
import { IAuthenticator } from "./interfaces/IAuthenticator";

// class Authenticator implements IAuthenticator {
//   public isAuthenticated: boolean;

//   constructor(isAuthenticated: boolean = false) {
//     this.isAuthenticated = isAuthenticated;
//   }
//   public authenticate() {
//     return new Authenticator(true);
//   }
// }

export default class App extends React.Component<{ store: Store }, {}> {
  public render() { return (
      <ReduxProvider store={this.props.store}>
        <Router>
          <ApolloProvider client={client}>
            <Navbar />
            <Route path="/login" component={Login}/>
            <PrivateRoute
              path="/challenges"
              component={WipChallenges}
            />
          </ApolloProvider>
        </Router>
      </ReduxProvider>
  ); }
}
