import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const defaultTypeDefs = `
scalar DateTime

type Query {
  _empty: String
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

const typeDefs = [defaultTypeDefs, typeDefsChallenge + typeDefsWipChallenge]

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({
  schema,
  mocks: {
    DateTime: () => new Date("2019-02-20")
  }
});

export default schema;
