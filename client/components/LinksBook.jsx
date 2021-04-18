import React, { useState } from "react";

import styles from "../styles/dash.module.css";
import Link from "next/link";



export default function LinksBook({title, description, link, view, shareHandler })  {

    const deleteLinksBook = () => {
        fetch(`https://linksbook-server.vercel.app/linksbook/${link}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({what: "nothing"})
        }).then(res => console.log(res))
    }

    return (
        <div className={styles.LinksBooksCard}>
            <Link href={`/dashboard/${link}`}>
                <div>
                <h2>{title}</h2>
                <p>{description}</p>
                </div>
            </Link>
            <span className={styles.collectionView}>
                { view===true  ? <p className={styles.public}>Public</p> : <p className={styles.private}>Private</p> }
                <Link href={`/dashboard/edit/${link}`}>
                    <button>
                        Edit
                    </button>
                </Link>
                { view===true  ? <p onClick={() => shareHandler(link)} className={styles.public}>Share</p> : "" }
                <button onClick={() => deleteLinksBook()}>
                    Delete
                </button>
            </span>
        </div>
    )
}