import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";

const defaultTypeDefs = `
scalar DateTime

type Query {
  _empty: String
}

type LoginResponse {
  jwt: String
  errors: [String]!
}

type Mutation {
  login(email: String!, password: String!): LoginResponse
}
`;

const typeDefsChallenge = `
type Challenge {
  id: ID!
  title: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

extend type Query {
  challenges: [Challenge]!
}
`;

const typeDefsWipChallenge = `
type WipChallenge {
  id: ID!
  userEmail: String!
  status: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  challengeId: ID!
  challenge: Challenge!
}

extend type Query {
  wipChallenges: [WipChallenge]!
}
`;

const typeDefs = [defaultTypeDefs, typeDefsChallenge + typeDefsWipChallenge];

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  mocks: {
    DateTime: () => new Date("2019-02-20"),
  },
  schema,
});

export default schema;
