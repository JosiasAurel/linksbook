import React from "react";

import "../styles/global.css"
import Head from "next/head";

const App = ({Component, ...pageProps}) => {
    return (
            <div>
                <Head>
                    <script src="/gtag.js"></script>
                </Head>
                <Component {...pageProps} />
            </div>
    )
}

export default App;