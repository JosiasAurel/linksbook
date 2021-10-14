import React, { FunctionComponent } from "react";

import "../styles/global.css";

import { AppProps } from "next/app";

// Use Geist UI components
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import AuthProvider from "../contexts/auth";

/* Init Apollo Client */
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URI}/graphql`
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
        <AuthProvider>
            <GeistProvider>
                <CssBaseline />
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </GeistProvider>
        </AuthProvider>
    )
}

export default LinksBookApp;