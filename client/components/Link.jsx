import React from "react";
import styles from "../styles/dash.module.css";

import Link from "next/link";

const LinkCard = ({ id, title, link, description }) => {

    // delete link handler
    const deleteLink = () => {
        fetch(`http://localhost:4000/link/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({what: "nothing"})
        }).then(res => console.log(res))
    }
    return (
        <div className={styles.link}>
            <h2>{title}</h2>
            <a target="blank" href={link}>{link}</a>
            <p>
                { description }
            </p>
            <span className={styles.editLinkControllers}>
                <Link href={`/dashboard/editlink/${id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => deleteLink()}>Delete</button>
            </span>
        </div>
    )
};

export default LinkCard;