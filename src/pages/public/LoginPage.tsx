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


const LoginPage: React.FunctionComponent<IProps> = (props) => {
  const submitLogin = (loginMutation: MutationFn) => {
    return async ({ email, password }: ILoginForm) => {
      const response = await loginMutation({
        variables: { email, password },
      });

      const { user, jwt } = response && response.data.signIn;

      props.authenticate();
      props.setCurrentUser({ ...user, jwt });
      props.redirect();
    };
  };

  return (
    <Mutation mutation={LOGIN}>
      {(login: MutationFn, { error }: MutationResult) => (
        <div>
          {error && graphQLErrorMessages(error)}
          <LoginForm onSubmit={submitLogin(login)} />
        </div>
      )}
    </Mutation>
  );
};

export default compose<React.ComponentType<IProps>>(
  connect(null, { authenticate, setCurrentUser }),
  Redirectable.HOC,
)(LoginPage);
