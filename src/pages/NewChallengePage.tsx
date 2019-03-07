import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { Redirect } from "react-router";

interface IState {
  title: string;
  description: string;
  isChallengeCreated: boolean;
}

export default class NewChallengePage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = { title: "", description: "", isChallengeCreated: false };
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

            <div>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                value={this.state.title}
                onChange={(e) => { this.setState({ title: e.target.value }); }}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                name="description"
                value={this.state.description}
                onChange={(e) => { this.setState({ description: e.target.value }); }}
              />
            </div>

            <button onClick={this.createChallenge(createChallenge)} type="button">
              Submit
            </button>
            { this.state.isChallengeCreated && <Redirect to={"/challenges"} /> }
          </div>
        )}
      </Mutation>
    );
  }

  private createChallenge(createChallengeMutation: MutationFn) {
    return async () => {
      await createChallengeMutation({
        variables: {
          description: this.state.description,
          title: this.state.title,
        },
      });
      this.setState({ isChallengeCreated: true });
    };
  }
}
