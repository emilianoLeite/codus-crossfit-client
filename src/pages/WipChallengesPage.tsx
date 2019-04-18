import gql from "graphql-tag";
import React from "react";
import { Query, QueryResult } from "react-apollo";
import WipChallengesList from "../components/WipChallengesList";

export default function WipChallenges() {
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
      {({ loading, error, data }: QueryResult) => {
        if (loading) { return <p>Loading...</p>; }
        if (error) { return <p>Error ☹</p>; }

        return <WipChallengesList wipChallenges={data.wipChallenges} />;
      }}
    </Query>
  );
}
