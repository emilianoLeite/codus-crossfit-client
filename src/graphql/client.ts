import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-boost";
import { SchemaLink } from "apollo-link-schema";

import schema from './schema';

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
});
