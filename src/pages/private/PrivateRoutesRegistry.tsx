import React from "react";
import {
  ChallengesPage,
  EditChallengePage,
  NewChallengePage,
} from ".";
import PrivateRoute from "../../components/PrivateRoute";

export default function PrivateRoutesRegistry() {
  return (
    <React.Fragment>
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
