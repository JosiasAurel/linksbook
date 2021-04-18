import React, { useState, useEffect } from "react";

import LinkCard from "../../components/publicLink";

import styles from "../../styles/dash.module.css";

const PublicCollection = (props) => {
    let collection = props.pageProps.id.collection;

    console.log(collection);

    const [Coll, setColl] = useState([]);

    function fetchAndSetLinksBooks() {
        fetch(`https://linksbook-server.vercel.app/getlinks/${collection}`)
            .then(res => res.json())
            .then(data => {
                setColl(data);
        })
    }

    useEffect(() => {
        fetchAndSetLinksBooks();
    }, [])

    return (
        <div className={styles.linksPage}>
            <main className={styles.links}>
                {Coll === [] ? <h2> No Links in this collection </h2>
                : Coll.map(link => {
                    return (
                        <LinkCard 
                        title={link.title}
                        description={link.description}
                        link={link.link}
                        />
                    )
                })}
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let linksbookId = ctx.query;
    console.log(linksbookId);
    return {
        props: {
            id: linksbookId
        }
    }
}

export default PublicCollection;