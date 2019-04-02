import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";

import ChallengeForm from "../components/ChallengeForm";
import * as Redirectable from "../components/Redirectable";
import { IChallenge } from "../interfaces/IChallenge";

interface IState {
  isChallengeCreated: boolean;
}

class NewChallengePage extends React.Component<Redirectable.IRedirectableProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = { isChallengeCreated: false };
    this.createChallenge = this.createChallenge.bind(this);
  }

  public render() {
    const CREATE_CHALLENGE = gql`
      mutation CreateChallenge($title: String!, $description: String!) {
        createChallenge(title: $title, description: $description) {
          id
        }
      }
    `;

    const graphQLErrorMessages = (error: ApolloError) => {
      return error.graphQLErrors.map((graphQLError) => {
        return (
          <div key={graphQLError.message}>
            {graphQLError.message}
          </div>
        );
      });
    };

    return (
      <Mutation mutation={CREATE_CHALLENGE}>
        {(createChallenge, { error }) => (
          <div>
            {error && graphQLErrorMessages(error)}
            <ChallengeForm
              onSubmit={this.createChallenge(createChallenge)}
            />
          </div>
        )}
      </Mutation>
    );
  }

  private createChallenge(createChallengeMutation: MutationFn) {
    return async ({ title, description }: IChallenge) => {
      await createChallengeMutation({ variables: { description, title } });
      this.props.redirect("/challenges");
    };
  }
}

export default Redirectable.HOC(NewChallengePage);
