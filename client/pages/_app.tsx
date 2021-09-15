import React, { FunctionComponent } from "react";

import "../styles/global.css";

import { AppProps } from "next/app";

/* Init Apollo Client */
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql"
});

const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem("token");

    // headers included in request
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : ""
        }
    }
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default LinksBookApp;