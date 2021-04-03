import React, { useState, useEffect } from "react";
import Link from "../components/Link";
import styles from "../styles/index.module.css";

// import utility functions
// import { getLinks } from "../utils/fetchRequest";

const Index = () => {
    const [Links, setLinks] = useState([]);

    /* const getAndSetLinks = async () => {

        let results = await getLinks("http://localhost:3000/api/getlinks");
        setLinks(results);
    } */

    // getAndSetLinks();

    useEffect(() => {
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

    }, [Links])
    return (
        <div className={styles.page}>
            <header>
                <h1>LinksBook</h1>
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

            <div>
                <button>
                    
                </button>
            </div>
        </div>
    )
};

export default Index;