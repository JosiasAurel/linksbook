import React from "react";

import "../styles/global.css"
import Head from "next/head";

const App = ({Component, ...pageProps}) => {
    return (
        <div>
            <Head>
                <script src="https://cdn.jsdelivr.net/npm/jost-analytics@1.3.0/jost.min.js"></script>
            </Head>
           <Component {...pageProps} />
        </div>
    )
}

export default App;
