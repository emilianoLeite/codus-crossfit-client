import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux-starter-kit";

import LoginForm, { ILoginForm } from "../../components/LoginForm";
import * as Redirectable from "../../components/Redirectable";
import { authenticate, setCurrentUser } from "../../redux/actions";
import { IReduxAuthenticationProps } from "../../redux/reducers/AuthenticationReducer";

interface IProps extends Redirectable.IRedirectableProps, IReduxAuthenticationProps { }

interface IState {
  from: object;
  redirectToReferrer: boolean;
}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
  }

  public render() {
    const LOGIN = gql`
      mutation Login($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
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
        {(login: MutationFn, { error }: MutationResult) => (
          <div>
            {error && graphQLErrorMessages(error)}
            <LoginForm onSubmit={this.submitLogin(login)} />
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

      const { user, jwt } = response && response.data.signIn;

      this.props.authenticate();
      this.props.setCurrentUser({ ...user, jwt });
      this.props.redirect();
    };
  }
}

export default compose<React.ComponentType<IProps>>(
  connect(null, { authenticate, setCurrentUser }),
  Redirectable.HOC,
)(LoginPage);
