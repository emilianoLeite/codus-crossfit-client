import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { authenticate } from "../redux/actions";

interface IState {
  email: string;
  from: object;
  password: string;
  redirectToReferrer: boolean;
}

class Login extends React.Component<{ authenticate: any }, IState> {
  constructor(props: any) {
    super(props);

    const { from } = props.location.state || { from: { pathname: "/" } };

    this.state = {
      email: "",
      from,
      password: "",
      redirectToReferrer: false,
    };

    this.submitLogin = this.submitLogin.bind(this);
  }

  public render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={this.state.from} />;
    }

    const LOGIN = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
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
      <Mutation mutation={LOGIN}>
        {(login, { error }) => (
          <div>
            {error && graphQLErrorMessages(error)}

            <label htmlFor="email"> Email </label>
            <input
              name="email"
              defaultValue={this.state.email}
              onChange={(e) => { this.setState({ email: e.target.value }); }}
            />
            <label htmlFor="password"> Password </label>
            <input
              name="password"
              defaultValue={this.state.password}
              type="password"
              onChange={(e) => { this.setState({ password: e.target.value }); }}
            />
            <button onClick={this.submitLogin(login)} type="button">
              Login
            </button>
          </div>
        )}
      </Mutation>
    );
  }

  private submitLogin(loginMutation: MutationFn) {
    return async () => {
      await loginMutation({
        variables: {
          email: this.state.email,
          password: this.state.password,
        },
      });

      this.props.authenticate();
      this.setState({ redirectToReferrer: true });
    };
  }
}

export default connect(null, { authenticate })(Login);
