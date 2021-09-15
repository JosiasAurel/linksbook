import React, { FunctionComponent } from "react";

import "../styles/global.css";

import { AppProps } from "next/app";

/* Init Apollo Client */
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
});

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default LinksBookApp;