import React from "react";

import styles from "../styles/dash.module.css";
import Link from "next/link";

export default function LinksBook({title, description, link })  {

    return (
        <div className={styles.LinksBooksCard}>
            <Link href={`/dashboard/${link}`}>
                <div>
                <h2>{title}</h2>
                <p>{description}</p>
                </div>
            </Link>
        </div>
    )
}
