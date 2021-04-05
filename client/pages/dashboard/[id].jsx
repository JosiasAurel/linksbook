import React, { useEffect, useState } from "react";
import styles from "../../styles/dash.module.css";
import Link from "../../components/Link";

const LinksPage = (props) => {
    const [linkBookId, setLinkBookId] = useState(props.pageProps.id.id);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        console.log(linkBookId)
        fetchLinks()
    })

    function fetchLinks() {
        fetch(`http://localhost:4000/getlinks/${linkBookId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLinks(data)
            })
    }
    return (
        <div className={styles.linksPage}>
            <h2>Here are your links</h2>
            <section className={styles.linksPageLinksContainer}>
                <main className={styles.linksPageLinks}>
                {links.map(link => {
                    return (
                        <Link 
                        title={link.title}
                        description={link.description}
                        link={link.link}
                        />
                    )
                })}
            </main>
            </section>
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

export default LinksPage;