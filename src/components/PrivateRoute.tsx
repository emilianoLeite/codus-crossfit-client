import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { IAuthenticator } from "../interfaces/IAuthenticator";

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  authenticator: IAuthenticator;
}

export default function PrivateRoute({ component, ...rest }: IPrivateRouteProps) {
  const Component = component;
  const { authenticator, ...routeProps } = rest;
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
      {...routeProps}
      render={(props) => authenticator.isAuthenticated ? realComponent(props) : redirectToLogin(props)}
    />
  );
}
