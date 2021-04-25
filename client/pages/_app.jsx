import React from "react";

import "../styles/global.css"

const App = ({Component, ...pageProps}) => {
    return (
            <div>
                <Component {...pageProps} />
                <script src="/gtag.js"></script>
            </div>
    )
}

export default App;