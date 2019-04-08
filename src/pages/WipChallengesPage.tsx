import gql from "graphql-tag";
import React from "react";
import { Query, QueryResult } from "react-apollo";
import WipChallengesList from "../components/WipChallengesList";
import { ChallengeStatus, IWipChallenge } from "../interfaces/IWipChallenge";


const filterByDoing = ({ status }: IWipChallenge) => status === ChallengeStatus.DOING;
const filterByDone = ({ status }: IWipChallenge) => status === ChallengeStatus.DONE;

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

        const doingWipChallenges = (data.wipChallenges as IWipChallenge[]).filter(filterByDoing);
        const doneWipChallenges = (data.wipChallenges as IWipChallenge[]).filter(filterByDone);


        return (
          <React.Fragment>
            <WipChallengesList wipChallenges={doingWipChallenges} />
            <WipChallengesList wipChallenges={doneWipChallenges} />
          </React.Fragment>
        );
      }}
    </Query>
  );
}
