import React, { FunctionComponent } from "react";

import { AppProps } from "next/app";

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
    return <Component {...pageProps} />;
}

export default LinksBookApp;