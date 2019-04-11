import gql from "graphql-tag";
import React from "react";
import { Query, QueryResult } from "react-apollo";
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

  return (
    <Query query={query}>
      {({ loading, error, data }: QueryResult) => {
        if (loading) { return <p>Loading...</p>; }
        if (error) { return <p>Error ☹</p>; }

        return <WipChallengesBoard wipChallenges={data.wipChallenges}/>;
      }}
    </Query>
  );
}
