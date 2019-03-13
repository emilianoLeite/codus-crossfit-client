import React from "react";
import { Link, match as RouteMatch, RouteComponentProps, withRouter } from "react-router-dom";

interface IProps extends RouteComponentProps {
  children: React.ReactNode;
  match: RouteMatch;
  to: string;
}

const joinPaths = (...paths: string[]) => paths.join("/").replace(/\/\//g, "/");
const RelativeLink: React.FunctionComponent<IProps> = ({ children, match, to }) => (
  <Link to={joinPaths(match.url, to)}>{children}</Link>
);

export default withRouter(RelativeLink);
