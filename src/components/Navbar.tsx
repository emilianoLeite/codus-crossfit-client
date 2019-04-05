import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav>
      <Link to={"/challenges"}> Challenges </Link>
      <Link to={"/wip_challenges"}> WIP Challenges </Link>
    </nav>
  );
};
