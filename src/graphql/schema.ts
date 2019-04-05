import { GraphQLError } from "graphql";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";

const defaultTypeDefs = `
scalar DateTime

type Query {
  _empty: String
}

type User {
  id: ID!
  email: String!
}

type LoginResponse {
  jwt: ID!
  user: User
}

type Mutation {
  login(email: String!, password: String!): LoginResponse!
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
  challenge(id: ID!): Challenge!
  challenges: [Challenge]!
}

extend type Mutation {
  createChallenge(title: String!, description: String!): Challenge!
  updateChallenge(id: ID!, title: String, description: String): Challenge!
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
      createChallenge: (obj: any, { title }: any) => {
        if (title === "") {
          throw new GraphQLError("Title cannot be blank");
        } else {
          return {}; // All fields are generated by mock
        }
      },
      login: (obj: any, { password }: { password: string }) => {
        if (password === "123") {
          throw new GraphQLError("login failed");
        } else {
          return {
            jwt: "JWT Token 2133214214",
          };
        }
      },
    }),
  },
  schema,
});

export default schema;
