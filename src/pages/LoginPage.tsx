import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { PayloadActionCreator } from "redux-starter-kit";

import LoginForm, { ILoginForm } from "../components/LoginForm";
import { authenticate, setCurrentUser } from "../redux/actions";
import { IReduxAuthentication } from "../redux/reducers/AuthenticationReducer";

interface IProps {
  authenticate: PayloadActionCreator;
  setCurrentUser: PayloadActionCreator;
}

interface IState {
  from: object;
  redirectToReferrer: boolean;
}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    const { from } = props.location.state || { from: { pathname: "/" } };

    this.state = { from, redirectToReferrer: false };
    this.submitLogin = this.submitLogin.bind(this);
  }

  public render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={this.state.from} />;
    }

    const LOGIN = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          jwt
          user {
            id
            email
          }
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
      <Mutation mutation={LOGIN}>
        {(login, { error }) => (
          <div>
            {error && graphQLErrorMessages(error)}
            <LoginForm
              onSubmit={this.submitLogin(login)}
            />
          </div>
        )}
      </Mutation>
    );
  }

  private submitLogin(loginMutation: MutationFn) {
    return async ({ email, password }: ILoginForm) => {
      const response = await loginMutation({
        variables: { email, password },
      });
      const user = response && response.data.login.user as IReduxAuthentication;

      this.props.authenticate();
      this.props.setCurrentUser(user);
      this.setState({ redirectToReferrer: true });
    };
  }
}

export default connect(null, { authenticate, setCurrentUser })(LoginPage);
