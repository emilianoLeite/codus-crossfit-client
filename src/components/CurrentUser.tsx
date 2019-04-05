import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IReduxAuthentication, IReduxUser } from "../redux/reducers/AuthenticationReducer";

function CurrentUser({ user }: { user?: IReduxUser }) {
  return (
    user ?
      <span>Current User: {user.email}</span> :
      <Link to={"/login"}> Login </Link>
  );
}

const mapStateToProps = ({ authentication }: { authentication: IReduxAuthentication }) => ({
  user: authentication.user,
});
export default connect(mapStateToProps)(CurrentUser);
