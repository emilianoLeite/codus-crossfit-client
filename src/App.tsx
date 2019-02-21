import React from "react";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import WipChallenges from "./components/WipChallenges";
import client from "./graphql/client";

export default class App extends React.Component {
  public render() { return (
    <Router>
      <ApolloProvider client={client}>
        <Navbar />
        <Route path="/challenges" component={WipChallenges}/>
      </ApolloProvider>
    </Router>
  ); }
}
