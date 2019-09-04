import React from "react";
import configureStore from "../../../redux/ConfigureStore";
import apolloClient from "../../../graphql/client";
import { Provider } from "react-redux";
import { render, fireEvent, getByText } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { ApolloProvider } from "react-apollo";

// I'm trying to follow the examples of https://testing-library.com/docs/example-react-redux

const mainStore = configureStore();

function renderWithRedux(
  ui,
  { store = mainStore } = {}
) {
  const uiWithProvider = <Provider store={ store }> { ui } </Provider>;
  return {
    ...render(uiWithProvider),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

function renderWithApollo(ui, client = apolloClient(mainStore)) {
  return {
    ...render(<ApolloProvider client={client}> {ui} </ApolloProvider>),
  };
}

const renderWithProviders = (ui) => (renderWithRedux(renderWithApollo(ui)));


it("renders without crashing", () => {
  const div = document.createElement("div");
  renderWithProviders(<LoginPage />, div);
  expect(getByText("email")).toBeInTheDocument();
});
