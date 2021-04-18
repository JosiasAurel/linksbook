import React, { useState } from "react";

import styles from "../styles/dash.module.css";
import Link from "next/link";



export default function LinksBook({title, description, link, view})  {

    const deleteLinksBook = () => {
        fetch(`http://localhost:4000/linksbook/${link}`, {
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
                <button onClick={() => deleteLinksBook()}>
                    Delete
                </button>
            </span>
        </div>
    )
}