import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import ChallengeList from "../components/ChallengeList";
import RelativeLink from "../components/RelativeLink";
import "../styles/ChallengesPage.css";

const ChallengesPage: React.FunctionComponent = () => {
  const renderChallengeList = () => {
    const ALL_CHALLENGES = gql`{
      challenges {
        id
        title
      }
    }`;
    return (
      <Query query={ALL_CHALLENGES}>
        {({ loading, error, data }) => {
          if (loading) { return <p>Loading...</p>; }
          if (error) { return <p>Error ☹</p>; }

          return <ChallengeList challenges={data.challenges} />;
        }}
      </Query>
    );
  };

  return (
    <div className="challenges-page-container">
      <RelativeLink to="/new">Create Challenge</RelativeLink>
      {renderChallengeList()}
    </div>
  );
};

export default ChallengesPage;
