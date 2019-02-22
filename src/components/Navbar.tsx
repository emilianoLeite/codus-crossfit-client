import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav style={{ background: "#eee", padding: "5px"}}>
      <Link to={`/login`}> Login </Link>
      <Link to={`/challenges`}> Challenges </Link>
    </nav>
  );
};
