import React from "react";
import { renderWithProviders } from "test-utils";
// import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../LoginPage";

// I'm trying to follow the examples of https://testing-library.com/docs/example-react-redux

it("renders without crashing", () => {
  const div = document.createElement("div");
  const { queryAllByText } = renderWithProviders(<LoginPage />, div);
  expect(queryAllByText("Login").length).not.toEqual(0);
});
