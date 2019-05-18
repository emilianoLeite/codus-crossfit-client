/* eslint-disable */

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: any;
};

export type Challenge = {
  id: Scalars["ID"];
  title: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum ChallengeStatus {
  Doing = "DOING",
  Done = "DONE"
}

export type LoginResponse = {
  jwt: Scalars["ID"];
  user?: Maybe<User>;
};

export type Mutation = {
  _empty?: Maybe<Scalars["String"]>;
  createChallenge?: Maybe<Challenge>;
  updateChallenge?: Maybe<Challenge>;
  deleteChallenge?: Maybe<Challenge>;
  createWipChallenge: WipChallenge;
  moveWipChallenge?: Maybe<WipChallenge>;
  deleteWipChallenge?: Maybe<WipChallenge>;
  signIn: LoginResponse;
  signUp: User;
};

export type MutationCreateChallengeArgs = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type MutationUpdateChallengeArgs = {
  id: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type MutationDeleteChallengeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWipChallengeArgs = {
  userEmail: Scalars["String"];
  challengeId: Scalars["ID"];
};

export type MutationMoveWipChallengeArgs = {
  id: Scalars["ID"];
  newStatus?: Maybe<ChallengeStatus>;
};

export type MutationDeleteWipChallengeArgs = {
  id: Scalars["ID"];
};

export type MutationSignInArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignUpArgs = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type Query = {
  _empty?: Maybe<Scalars["String"]>;
  challenges: Array<Maybe<Challenge>>;
  challenge?: Maybe<Challenge>;
  wipChallenges: Array<Maybe<WipChallenge>>;
  wipChallenge?: Maybe<WipChallenge>;
};

export type QueryChallengeArgs = {
  id: Scalars["ID"];
};

export type QueryWipChallengeArgs = {
  id: Scalars["ID"];
};

export type User = {
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  encryptedPassword: Scalars["String"];
  roles: Array<UserRole>;
};

export enum UserRole {
  User = "USER",
  Admin = "ADMIN"
}

export type WipChallenge = {
  id: Scalars["ID"];
  userEmail: Scalars["String"];
  status: ChallengeStatus;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  challengeId: Scalars["ID"];
  challenge: Challenge;
};
export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  signIn: { __typename?: "LoginResponse" } & Pick<LoginResponse, "jwt"> & {
      user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
    };
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      jwt
      user {
        id
        email
      }
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LoginMutationVariables }
) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}
