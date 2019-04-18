import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn, Query, QueryResult, MutationResult } from "react-apollo";

import { RouteComponentProps } from "react-router";
import ChallengeForm from "../components/ChallengeForm";
import * as Redirectable from "../components/Redirectable";
import { IChallenge } from "../interfaces/IChallenge";

interface IProps extends Redirectable.IRedirectableProps, RouteComponentProps<{id: string}> {}

const EditChallengePage: React.FunctionComponent<IProps> = (props) => {
  const GET_CHALLENGE_BY_ID = gql`
    query GetChallenge($id: ID!) {
      challenge(id: $id) {
        id
        title
        description
      }
    }
  `;

  const UPDATE_CHALLENGE = gql`
    mutation UpdateChallenge($id: ID!, $title: String, $description: String) {
      updateChallenge(id: $id, title: $title, description: $description) {
        id
      }
    }
  `;

  const graphQLErrorMessages = (error: ApolloError) => {
    return error.graphQLErrors.map((graphQLError) => {
      return (
        <div key={graphQLError.message}>
          {graphQLError.message}
        </div>
      );
    });
  };

  const updateChallenge = (updateChallengeMutation: MutationFn, id: string) => {
    return async ({ title, description }: IChallenge) => {
      await updateChallengeMutation({ variables: { id, description, title } });
      props.redirect("/challenges");
    };
  };

  return (
    <Query query={GET_CHALLENGE_BY_ID} variables={{ id: props.match.params.id }}>
      {({ loading, error: queryError, data }: QueryResult) => {
        if (loading) { return <p>Loading...</p>; }
        if (queryError) { return <p>Error ☹ {queryError.message}</p>; }

        return (
          <Mutation mutation={UPDATE_CHALLENGE}>
            {(updateMutation: MutationFn, { error }: MutationResult) => (
              <div>
                {error && graphQLErrorMessages(error)}
                <ChallengeForm
                  challenge={data.challenge}
                  onSubmit={updateChallenge(updateMutation, data.challenge.id)}
                />
              </div>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default Redirectable.HOC(EditChallengePage);
