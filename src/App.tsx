import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from "react-redux";
import { Route } from "react-router-dom";
import { Store } from "redux";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import WipChallenges from "./components/WipChallenges";
import client from "./graphql/client";
import { history } from "./redux/ConfigureStore";

export default class App extends React.Component<{ store: Store }, {}> {
  public render() { return (
    <ReduxProvider store={this.props.store}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={client}>
          <Navbar />
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/challenges"
            component={WipChallenges}
          />
        </ApolloProvider>
      </ConnectedRouter>
    </ReduxProvider>
  ); }
}
