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
  interface IState {
    redirectTo: LocationDescriptorObject;
    redirectToReferrer: boolean;
  }

  return class WrappedComponent extends React.Component<P & IProps, IState> {
    public static displayName = `Redirectable(${getComponentName(Component)})`;

    public state = {
      redirectTo: {},
      redirectToReferrer: false,
    };

    public render() {
      if (this.state.redirectToReferrer) {
        return <Redirect to={this.state.redirectTo} />;
      } else {
        return <Component {...this.props} redirect={this.handleRedirect} />;
      }
    }

    private handleRedirect: RedirectableCallback = (pathname) => {
      const destination = this.destinationFor(pathname);

      this.setState({
        redirectTo: destination,
        redirectToReferrer: true,
      });
    }

    private destinationFor = (pathname?: string): LocationDescriptorObject => {
      if (pathname) {
        return { pathname };
      } else {
        return this.defaultDestination;
      }
    }

    private get defaultDestination(): LocationDescriptorObject {
      return this.props.location.state.from || { pathname: "/" };
    }
  };

  function getComponentName<T>(reactComponent: React.ComponentType<T>): string {
    return reactComponent.displayName || reactComponent.name || "Component";
  }
}
