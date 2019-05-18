import React from "react";
import { Query, QueryResult } from "react-apollo";

import UIModal, { UIModalBehaviorProps } from "./UI/Modal";
import gql from "graphql-tag";

interface IProps extends UIModalBehaviorProps {
  challenge: {
    id: string;
    title?: string;
  };
};

const ChallengeModal: React.FunctionComponent<IProps> = ({ challenge, children, ...rest }) => {
  const GET_CHALLENGE_BY_ID = gql`
    query GetChallenge($id: ID!) {
      challenge(id: $id) {
        description
      }
    }
  `;

  return (
    <UIModal title={challenge.id} {...rest}>
      <Query query={GET_CHALLENGE_BY_ID} variables={{ id: challenge.id }}>
        {({ loading, error, data }: QueryResult) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <p>Error ☹ {error.message}</p>; }

          return data.challenge && <p>{data.challenge.description}</p>;
        }}
      </Query>
    </UIModal>
  );
};

export default ChallengeModal;
