import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { IAuthenticator } from "../interfaces/IAuthenticator";

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

function PrivateRoute({ component, isAuthenticated, ...rest }: IPrivateRouteProps) {
  const Component = component;
  const realComponent = (props: any) => <Component {...props} />;
  const redirectToLogin = (props: any) => (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location },
      }}
    />
  );

  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated ? realComponent(props) : redirectToLogin(props)}
    />
  );
}

const mapStateToProps = ({ isAuthenticated }: { isAuthenticated: boolean }) => ({ isAuthenticated });
export default connect(mapStateToProps)(PrivateRoute);
