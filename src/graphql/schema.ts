import { GraphQLError } from "graphql";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";

const defaultTypeDefs = `
scalar DateTime

type Query {
  _empty: String
}

type Mutation {
  login(email: String!, password: String!): String!
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
    Mutation: () => ({
      login: (_obj: any, { password }: { password: string }) => {
        if (password === "123") {
          throw new GraphQLError("login failed");
        } else {
          return "JWT Token 2133214214";
        }
      },
    }),
  },
  schema,
});

export default schema;
