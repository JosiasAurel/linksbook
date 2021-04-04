import React, { useState, useEffect } from "react";
import styles from "../styles/dash.module.css";

import Link from "../components/Link";
import Image from "next/image";

const Dashboard = () => {

    const [Links, setLinks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/getlinks")
            .then(res => res.json())
            .then(data => setLinks(data))
            .catch(err => (new Error(err)))
    });

    return (
        <div className={styles.page}>
            <header>
                <span className={styles.logo}>
                    <h2>LinksBook</h2>
                    <Image src="/link-2.svg" width="40" height="40" />
                </span>
            </header>

            <h2>Here are your links
            </h2>

            <main className={styles.links}>
                {Links.map(({title, description, link}) => {
                    return (
                        <Link 
                        title={title}
                        description={description}
                        link={link}
                        />
                    )
                })}
            </main>
        </div>
    )
}

export default Dashboard;