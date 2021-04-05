import React from "react";

import styles from "../styles/dash.module.css";
import Link from "next/link";

const LinksBook = ({title, description, link}) => {
    return (
        <Link href={`/dashboard/${link}`}>
            <div className={styles.LinksBooksCard}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        </Link>
    )
}

export default LinksBook;