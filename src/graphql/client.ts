import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
// import { SchemaLink } from "apollo-link-schema";

import schema from "./schema";
import { Store } from "redux";

// const localSchema = new SchemaLink({ schema });
const remoteServer = createHttpLink({ uri: "https://codus-crossfit-server.herokuapp.com/" });

export default (store: Store) => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const { authentication: { user } } = store.getState();
    const token = user && user.jwt;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    // link: authLink.concat(localSchema),
    link: authLink.concat(remoteServer),
  });
};


