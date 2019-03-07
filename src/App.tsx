import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from "react-redux";
import { Route } from "react-router-dom";
import { Store } from "redux";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import client from "./graphql/client";
import {
  ChallengesPage,
  LoginPage,
  NewChallengePage,
  WipChallengesPage,
} from "./pages";
import { history } from "./redux/ConfigureStore";

export default class App extends React.Component<{ store: Store }, {}> {
  public render() { return (
    <ReduxProvider store={this.props.store}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={client}>
          <Header />
          <PrivateRoute exact path="/" component={WipChallengesPage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/wip_challenges"
            component={WipChallengesPage}
          />
          <PrivateRoute
            exact
            path="/challenges"
            component={ChallengesPage}
          />
          <PrivateRoute
            path="/challenges/new"
            component={NewChallengePage}
          />
        </ApolloProvider>
      </ConnectedRouter>
    </ReduxProvider>
  ); }
}
