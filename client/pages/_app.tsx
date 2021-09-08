import React, { FunctionComponent } from "react";

import "../styles/global.css";

import { AppProps } from "next/app";

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {

    return (
        <Component {...pageProps} />
    )
}

export default LinksBookApp;