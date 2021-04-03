import React from "react";
import styles from "../styles/index.module.css";

const Link = ({ title, link, description }) => {
    return (
        <div className={styles.link}>
            <h2>{title}</h2>
            <a about="blank" href={link}>{link}</a>
            <p>
                { description }
            </p>
        </div>
    )
};

export default Link;