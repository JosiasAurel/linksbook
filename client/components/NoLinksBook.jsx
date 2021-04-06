
import React from  "react";
import Image from "next/image";

import styles from "../styles/dash.module.css";

const NoLinksBook = ({ what, padLeft, padTop }) => {
    return (
        <div style={{position: "relative", left: padLeft, top: padTop ? padTop : "3em" }} className={styles.noLinksbook}>
            <Image src="/nolinksbk.svg" width="40" height="40" />
            <h1>You have no {what} yet!</h1>
        </div>
    )
}

export default NoLinksBook;