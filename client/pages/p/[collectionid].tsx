import React from "react";
import Head from "next/head";
import { Deta } from "deta";

const PublicCollection: React.FC = (): JSX.Element => {
    return (
        <div>
            <Head>
                <title>Hello World</title>
            </Head>
            <h1>Hello</h1>
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