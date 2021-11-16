import React from "react";
import Head from "next/head";
import { Deta } from "deta";

import styles from "../../styles/misc.module.css";

import PublicLink from "../../components/PublicLink";

interface PublicCollectionProps {
    pageData: any
}

const PublicCollection: React.FC<PublicCollectionProps> = ({ pageData }): JSX.Element => {

    return (
        <div className={styles.publicPage}>
            <Head>
                <title> {pageData.folder} </title>
                <link rel="shortcut icon" href="LinksBook.svg" type="image/x-icon" />
            </Head>
            <header className={styles.header}>
                <h1> {pageData.folder} </h1>
            </header>
            <main className={styles.content}>
                <div className={styles.bkmks}>
                    {pageData.bookmarks.map((b: { url: string; title: string; }) => {
                        return (
                            <PublicLink
                                key={b.url}
                                name={b.title}
                                url={b.url}
                            />
                        )
                    })}
                </div>
            </main>
            <footer style={{ textAlign: "center", margin: "1em 0" }}>
                Made on <a href="https://linksbook.me">
                    linksbook.me
                </a>
            </footer>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const deta = Deta(process.env.NEXT_PUBLIC_PROJECT_KEY);
    const folders = deta.Base("collections");
    const bookmarks = deta.Base("links");
    const folderId = ctx.query.collectionid;

    const folder: any = await folders.get(folderId);
    const resolvedLinks = [];

    for (let i = 0; i < folder.links.length; i++) {
        let bkmk = await bookmarks.get(folder.links[i]);
        // console.log(bkmk);
        resolvedLinks.push({ title: bkmk.annotation, url: bkmk.url });
    }

    const pageData = {
        folder: folder.name,
        bookmarks: resolvedLinks
    }

    return {
        props: { pageData }
    }
}

export default PublicCollection;