import React from "react";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { valueToObjectRepresentation } from "apollo-utilities";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import WipChallenges from "./components/WipChallenges";
import client from "./graphql/client";
import { IAuthenticator } from "./interfaces/IAuthenticator";

class Authenticator implements IAuthenticator {
  public isAuthenticated: boolean;

  constructor(isAuthenticated: boolean = false) {
    this.isAuthenticated = isAuthenticated;
  }
  public authenticate() {
    return new Authenticator(true);
  }
}

export default class App extends React.Component<{}, {authenticator: IAuthenticator}> {
  constructor(props: any) {
    super(props);
    this.state = { authenticator: new Authenticator() };
  }

  public render() { return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar />
        <Route path="/login" authenticator={this.state.authenticator} component={Login}/>
        <PrivateRoute
          path="/challenges"
          component={WipChallenges}
          authenticator={this.state.authenticator}
        />
      </ApolloProvider>
    </Router>
  ); }
}
