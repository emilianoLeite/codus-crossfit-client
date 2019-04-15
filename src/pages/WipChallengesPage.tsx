import gql from "graphql-tag";
import React from "react";
import { Mutation, Query, QueryResult, MutationResult, MutationFn } from "react-apollo";
import WipChallengesBoard from "../components/WipChallengesBoard";

export default function WipChallengesPage() {
  const query = gql`
    {
      wipChallenges {
        id
        userEmail
        status
      }
    }
  `;

  const MOVE_WIP_CHALLENGE = gql`
    mutation MoveWipChallenge($id: ID!, $status: ChallengeStatus) {
      moveWipChallenge(id: $id, newStatus: $status) {
        id
        status
      }
    }
  `;

  return (
    <Query query={query}>
      {({ loading, error, data }: QueryResult) => {
        if (loading) { return <p>Loading...</p>; }
        if (error) { return <p>Error ☹</p>; }

        return (
          <Mutation mutation={MOVE_WIP_CHALLENGE}>
            {(moveWipChallengeMutation: MutationFn, { error }: MutationResult) => (
              <WipChallengesBoard
                wipChallenges={data.wipChallenges}
                mutations={{ moveWipChallengeMutation }}
              />
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}
