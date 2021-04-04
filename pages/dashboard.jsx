import React, { useState, useEffect } from "react";
import Link from "../components/Link";
import styles from "../styles/dash.module.css";

// import utility functions
import { getLinks } from "../utils/fetchRequest";

const Index = () => {
    const [Links, setLinks] = useState([]);

    const getAndSetLinks = async () => {

        let results = await getLinks("http://localhost:3000/api/getlinks");
        setLinks(results);
    }

    useEffect(() => {
        getAndSetLinks();
    });
    

    /* useEffect(() => {
        //we better handle getting data here so it can be relative to the host
        const getLinks = async () => {
            const res = await fetch("/api/getlinks");
            const data = await res.json();
            return data;
        }

        const getAndSetLinks = async () => {
            let links = await getLinks();
            setLinks(links);
        }

        getAndSetLinks()

    }, [Links]) */
    return (
         <div className={styles.page}>
            <header>
                <span className={styles.logo}>
                    <h1>LinksBook</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="link-2"><rect width="24" height="24" opacity="0"/><path d="M13.29 9.29l-4 4a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4-4a1 1 0 0 0-1.42-1.42z"/><path d="M12.28 17.4L11 18.67a4.2 4.2 0 0 1-5.58.4 4 4 0 0 1-.27-5.93l1.42-1.43a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-1.27 1.28a6.15 6.15 0 0 0-.67 8.07 6.06 6.06 0 0 0 9.07.6l1.42-1.42a1 1 0 0 0-1.42-1.42z"/><path d="M19.66 3.22a6.18 6.18 0 0 0-8.13.68L10.45 5a1.09 1.09 0 0 0-.17 1.61 1 1 0 0 0 1.42 0L13 5.3a4.17 4.17 0 0 1 5.57-.4 4 4 0 0 1 .27 5.95l-1.42 1.43a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l1.42-1.42a6.06 6.06 0 0 0-.6-9.06z"/></g></g></svg>
                </span>
                <h2>Hey, {session.user.email}</h2>
            </header>

            <h2>Here are your links</h2>
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

            <div className={styles.createNewLinkContainer}>
                <button className={styles.createnNewLinkButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="file-add"><rect width="24" height="24" opacity="0"/><path d="M19.74 8.33l-5.44-6a1 1 0 0 0-.74-.33h-7A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V9a1 1 0 0 0-.26-.67zM14 5l2.74 3h-2a.79.79 0 0 1-.74-.85zm3.44 15H6.56a.53.53 0 0 1-.56-.5v-15a.53.53 0 0 1 .56-.5H12v3.15A2.79 2.79 0 0 0 14.71 10H18v9.5a.53.53 0 0 1-.56.5z"/><path d="M14 13h-1v-1a1 1 0 0 0-2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0-2z"/></g></g></svg>
                    <p>New</p>
                </button>
            </div>
        </div>
    )
};


export default Index;