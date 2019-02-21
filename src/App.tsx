import React from 'react';
import { ApolloProvider } from "react-apollo";

import WipChallenges from './components/WipChallenges';
import client from "./graphql/client";

export default class App extends React.Component {
  render() { return (
    <ApolloProvider client={client}>
      <WipChallenges/>
    </ApolloProvider>
  ); }
}
