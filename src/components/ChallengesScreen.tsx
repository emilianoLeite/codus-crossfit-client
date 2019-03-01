import React from "react";
import { Link, match } from "react-router-dom";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import "../styles/ChallengesScreen.css";
import ChallengeList from "./ChallengeList";

export default class ChallengesScreen extends React.Component<{match: match}, {}> {
  public render() { return (
    <div className="challenges-screen-container">
      <Link className="btn" to={`${this.props.match.url}/new`}> Create Challenge </Link>
      {this.renderChallengeList()}
    </div>
  ); }

  private renderChallengeList() {
    const ALL_CHALLENGES = gql`{
      challenges {
        id
        title
        description
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
  }
}
