import React, { FunctionComponent } from "react";

import styles from "../styles/index.module.css";

const ThankYouPage: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.page}>
            <h1>Hooray 🎉🎉 <br /> You have been added to the list. <br /> You will be notified when you can try this. </h1>
        </div>
    )
}

export default ThankYouPage;