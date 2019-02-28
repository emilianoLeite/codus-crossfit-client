import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IReduxAuthentication } from "../redux/reducers/AuthenticationReducer";

function CurrentUser(props: any) {
  return (
    props.user ?
      <span>Current User: {props.user.email}</span> :
      <Link to={`/login`}> Login </Link>
  );
}

const mapStateToProps = ({ authentication }: { authentication: IReduxAuthentication }) => ({
  user: authentication.user,
});
export default connect(mapStateToProps)(CurrentUser);
