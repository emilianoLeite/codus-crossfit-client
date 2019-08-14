import { Location, LocationDescriptorObject } from "history";
import React from "react";
import { Redirect } from "react-router";

type RedirectableCallback = (pathname?: string) => void;
export type Callback = RedirectableCallback;

export interface IRedirectableProps {
  redirect: RedirectableCallback;
}

export function HOC<P extends IRedirectableProps>(Component: React.ComponentType<P>) {
  interface IProps {
    location: Location;
  }

  function defaultDestination(location: IProps["location"]): LocationDescriptorObject {
    const { from = { pathname: "/challenges" } } = location.state || {};
    return from;
  }

  const WrappedComponent: React.FunctionComponent<P & IProps> = (props) => {
    const [redirectTo, setRedirectTo] = React.useState({});
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);


    const destinationFor = (pathname?: string): LocationDescriptorObject => {
      if (pathname) {
        return { pathname };
      } else {
        return defaultDestination(props.location);
      }
    };

    const handleRedirect: RedirectableCallback = (pathname) => {
      const destination = destinationFor(pathname);

      setRedirectTo(destination);
      setRedirectToReferrer(true);
    };

    if (redirectToReferrer) {
      return <Redirect to={redirectTo} />;
    } else {
      return <Component {...props} redirect={handleRedirect} />;
    }
  };

  WrappedComponent.displayName = Component.displayName || Component.name || "Component";
  return WrappedComponent;
}
