import React from "react";
import configureStore from "../redux/ConfigureStore";
import apolloClient from "../graphql/client";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { ApolloProvider } from "react-apollo";

const reduxStore = configureStore();
const client = apolloClient(reduxStore);

const AllTheProviders = ({ children }) => {
  return (
    <Provider store= {reduxStore} >
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
const renderWithProviders = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders };
