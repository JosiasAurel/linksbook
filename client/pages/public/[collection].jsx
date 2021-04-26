import React, { useState, useEffect } from "react";

import LinkCard from "../../components/publicLink";

import styles from "../../styles/dash.module.css";

import Head from "next/head";

const PublicCollection = (props) => {
    let collection = props.pageProps.id.collection;

    console.log(collection);

    const [Coll, setColl] = useState([]);
    const [lk, setLk] = useState({});

    function fetchAndSetLinksBooks() {
        fetch(`https://linksbook-server.vercel.app/getlinks/${collection}`)
            .then(res => res.json())
            .then(data => {
                setColl(data);
        })
    }

    function getLinksBookData() {
        fetch(`https://linksbook-server.vercel.app/linksbook/${collection}`)
            .then(res => res.json())
            .then(data => {
                setLk(data);
            })
    }

    useEffect(() => {
        getLinksBookData();
        fetchAndSetLinksBooks();
    }, [])

    return (
        <div className={styles.linksPage}>
            <Head>
<title>LinksBook - {lk.title}</title>
<meta name="title" content={lk.title} />
<meta name="description" content={lk.description} />

<meta property="og:type" content="website" />
<meta property="og:url" content="https://linksbook.me/" />
<meta property="og:title" content={lk.title} />
<meta property="og:description" content={lk.description} />
<meta property="og:image" content="https://i.ibb.co/q0yxJ6Y/ogf.png" />


<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://linksbook.me/" />
<meta property="twitter:title" content={lk.title} />
<meta property="twitter:description" content={lk.description} />
<meta property="twitter:image" content="https://i.ibb.co/q0yxJ6Y/ogf.png"></meta>
            </Head>
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