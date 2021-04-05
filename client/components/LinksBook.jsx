import React from "react";

import styles from "../styles/dash.module.css";

const LinksBook = ({title, description}) => {
    return (
        <div className={styles.LinksBooksCard}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default LinksBook;