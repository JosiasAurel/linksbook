import React, { FunctionComponent } from "react";

import { AppProps } from "next/app";

/* // the navigation context
import { NavigationContext, ApplicationNavigation } from "../contexts/navigation";
 */

import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import { useRouter } from "next/router";

const LinksBookApp: FunctionComponent<AppProps> = ({ Component, pageProps }): JSX.Element => {

    // list of public pages
    const publicPages: Array<string> = [];

    // get current page pathname
    const { pathname } = useRouter();

    // is the current page a public page ?
    const isPublicPage: boolean = publicPages.includes(pathname);

    return (
        <ClerkProvider>
            {isPublicPage ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <SignedIn>
                        <Component {...pageProps} />
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                </>
            )
            }
        </ClerkProvider>
    )
}

export default LinksBookApp;