
import React from  "react";
import Image from "next/image";

import styles from "../styles/dash.module.css";

const NoLinksBook = () => {
    return (
        <div className={styles.noLinksbook}>
            <Image src="/nolinksbk.svg" width="40" height="40" />
            <h1>You have no linksbook yet!</h1>
        </div>
    )
}

export default NoLinksBook;