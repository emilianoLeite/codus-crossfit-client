import React from "react";
import {
  ChallengesPage,
  EditChallengePage,
  NewChallengePage,
  WipChallengesPage,
} from ".";
import PrivateRoute from "../components/PrivateRoute";

export default function PrivateRoutesRegistry() {
  return (
    <React.Fragment>
      <PrivateRoute exact path="/" component={WipChallengesPage} />
      <PrivateRoute path="/wip_challenges" component={WipChallengesPage} />
      <PrivateRoute
        exact
        path="/challenges"
        component={ChallengesPage}
      />
      <PrivateRoute path="/challenges/new" component={NewChallengePage} />
      <PrivateRoute
        path="/challenges/:id/edit"
        component={EditChallengePage}
      />
    </React.Fragment>
  );
}
