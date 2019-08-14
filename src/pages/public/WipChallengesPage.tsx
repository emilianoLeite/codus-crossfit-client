import gql from "graphql-tag";
import React from "react";
import { Mutation, Query, QueryResult, MutationResult, MutationFn } from "react-apollo";
import WipChallengesBoard from "../../components/WipChallengesBoard";

export default function WipChallengesPage() {
  const QUERY_BOARD_ITEMS = gql`
    {
      challenges {
        id
        title
      }
      wipChallenges {
        id
        userEmail
        status
        challenge {
          id
          title
        }
      }
    }
  `;

  const CREATE_WIP_CHALLENGE = gql`
    mutation CreateWipChallenge($challengeId: ID!, $email: String!) {
      createWipChallenge(challengeId: $challengeId, userEmail: $email) {
        id
        userEmail
        status
        challenge {
          id
          title
        }
      }
    }
  `;

  const MOVE_WIP_CHALLENGE = gql`
    mutation MoveWipChallenge($id: ID!, $status: ChallengeStatus) {
      moveWipChallenge(id: $id, newStatus: $status) {
        id
      }
    }
  `;

  return (
    <Query query={QUERY_BOARD_ITEMS}>
      {({ loading, error, data }: QueryResult) => {
        if (loading) { return <p>Loading...</p>; }
        if (error) { return <p>Error ☹</p>; }

        return (
          <Mutation mutation={MOVE_WIP_CHALLENGE}>
            {(moveWipChallengeMutation: MutationFn, { error: moveMutationError }: MutationResult) => (
              <Mutation mutation={CREATE_WIP_CHALLENGE}>
                {(createWipChallengeMutation: MutationFn, { error: createMutationError }: MutationResult) => (
                  <WipChallengesBoard
                    challenges={data.challenges}
                    wipChallenges={data.wipChallenges}
                    mutations={{ createWipChallengeMutation, moveWipChallengeMutation }}
                  />
                )}
              </Mutation>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}
