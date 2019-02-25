import gql from "graphql-tag";
import React from "react";
import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authenticate } from "../redux/actions";
class Login extends React.Component<{ authenticate: any }, { email: string, password: string }> {
  constructor(props: any) {
    super(props);
    this.state = { email: "", password: "" };
  }

  public render() {
    const LOGIN = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          jwt
        }
      }
    `;
    return(
      <Mutation mutation={LOGIN}>
        {(login, { data }) => (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login({
                  variables: {
                    email: this.state.email,
                    password: this.state.password,
                  },
                }).then((response: any) => this.props.authenticate());
              }}
            >
              <input
                defaultValue={this.state.email}
                onChange={(e) => { this.setState({ email: e.target.value }); }}
                placeholder="Email..."
              />
              <button type="submit">Login</button>
            </form>

            {data && data.login.jwt && <Redirect to={{ pathname: "/challenges" }} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

export default connect(() => ({}), { authenticate })(Login);
