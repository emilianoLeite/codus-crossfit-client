import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from "react-redux";
import { Route } from "react-router-dom";
import { Store } from "redux";

import Header from "./components/Header";
import client from "./graphql/client";
import {
  LoginPage,
  PrivateRoutesRegistry,
} from "./pages";
import { history } from "./redux/ConfigureStore";

export default class App extends React.Component<{ store: Store }, {}> {
  public render() { return (
    <ReduxProvider store={this.props.store}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={client(this.props.store)}>
          <Header />
          <Route path="/login" component={LoginPage} />
          <PrivateRoutesRegistry/>
        </ApolloProvider>
      </ConnectedRouter>
    </ReduxProvider>
  ); }
}
