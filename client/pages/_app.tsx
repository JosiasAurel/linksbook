import React, { FunctionComponent } from "react";

import { AppProps } from "next/app";

// the navigation context
import { NavigationContext, ApplicationNavigation } from "../contexts/navigation";

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {
    return (
        <ApplicationNavigation>
            <Component {...pageProps} />
        </ApplicationNavigation>
    )
}

export default LinksBookApp;