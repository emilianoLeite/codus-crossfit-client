import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createHttpLink } from "apollo-link-http";
import { SchemaLink } from "apollo-link-schema";

import schema from "./schema";

const localSchema = new SchemaLink({ schema });
// const remoteServer = createHttpLink({ uri: "http://localhost:4000" });

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: localSchema
});
