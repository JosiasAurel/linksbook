import React, { FunctionComponent } from "react";

import "../styles/global.css";

import { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";

// Use Geist UI components
import { GeistProvider, CssBaseline } from "vercel-style";
// import AuthProvider from "../contexts/auth";

/* Init Apollo Client */
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// react drag-n-drop
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem("token");

  // headers included in request
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const LinksBookApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GeistProvider>
        <CssBaseline />
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          {/* Toasts */}
          <Toaster />
          {/* End Toasts */}
        </ApolloProvider>
      </GeistProvider>
    </DndProvider>
  );
};

export default LinksBookApp;
