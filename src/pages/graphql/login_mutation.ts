import gql from "graphql-tag";

export default gql`
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
