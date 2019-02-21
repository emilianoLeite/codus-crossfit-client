import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

interface IWipChallenge {
  id: string,
  userEmail: string,
}

export default function WipChallenges(props: any) {
  const query = gql`
    {
      wipChallenges {
        id
        userEmail
      }
    }
  `;
  return (
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error ☹</p>;

        return data.wipChallenges.map(({ id, userEmail }: IWipChallenge) => (
          <div key={id}>
            <p>{userEmail}</p>
          </div>
        ));
      }}
    </Query>
  );
}
