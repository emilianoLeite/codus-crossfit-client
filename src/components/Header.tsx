import React from "react";
import CurrentUser from "./CurrentUser";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header>
      <Navbar />
      <CurrentUser />
    </header>
  );
}
