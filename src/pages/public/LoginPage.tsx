import { ApolloError } from "apollo-boost";
import loginMutation from "../graphql/login_mutation";
import React from "react";
import { Mutation, MutationFn, MutationResult } from "react-apollo";
import { connect } from "react-redux";
import { compose } from "redux-starter-kit";

import LoginForm, { ILoginForm } from "../../components/LoginForm";
import * as Redirectable from "../../components/Redirectable";
import { authenticate, setCurrentUser } from "../../redux/actions";
import { IReduxAuthenticationProps } from "../../redux/reducers/AuthenticationReducer";

import { LoginComponent, LoginMutationFn } from "../../graphql/_generated/types.d";

interface IProps extends Redirectable.IRedirectableProps, IReduxAuthenticationProps { }

interface IState {
  from: object;
  redirectToReferrer: boolean;
}

class LoginPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
  }

  public render() {
    const LOGIN = loginMutation;

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
      <>
        <LoginComponent>
          {(login, { error }) => (
            <div style={{background:"black"}}>
              {error && graphQLErrorMessages(error)}
              <LoginForm onSubmit={this.submitLogin(login)} />
            </div>
          )}
        </LoginComponent>

      <Mutation mutation={LOGIN}>
        {(login: MutationFn, { error }: MutationResult) => (
          <div>
            {error && graphQLErrorMessages(error)}
            <LoginForm onSubmit={this.submitLogin(login)} />
          </div>
        )}
      </Mutation>
        </>
    );
  }

  private submitLogin(loginMutation: LoginMutationFn) {
    return async ({ email, password }: ILoginForm) => {
      const response = await loginMutation({
        variables: { email, password },
      });

      if (response && response.data) {
        const { user, jwt } = response.data.signIn;

        if (user) {
          this.props.authenticate();
          this.props.setCurrentUser({ ...user, jwt });
          this.props.redirect();
        }
      }
    };

  }
}

export default compose<React.ComponentType<IProps>>(
  connect(null, { authenticate, setCurrentUser }),
  Redirectable.HOC,
)(LoginPage);
