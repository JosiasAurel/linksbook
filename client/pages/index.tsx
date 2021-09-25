import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

import Header from "../components/Header";
import Search from "../components/Search";
import LinkCard from "../components/LinkCard";
import CopyLink from "../components/CopyLink";
import Tag from "../components/Tag";

import styles from "../styles/index.module.css";

import toast, { Toaster } from "react-hot-toast";
import { Loading, Button, Tooltip, Spacer } from '@nextui-org/react';

import { Modal, Input } from "@geist-ui/react";

const HomePage: FunctionComponent = (): JSX.Element => {

    /* Create Link/Collection Modal states */
    const [createLink, setCreateLink] = useState<boolean>(false);
    const [createCollection, setCreateCollection] = useState<boolean>(false);
    function toggleModal(state, handler): void {
        handler(!state);
    }
    /*  */

    /* link card edit button action handle */
    /* Show Pop page props; abbreviated 'sp' */

    const [spTitle, setSPTitle] = useState<string>("");
    const [spLink, setSPLink] = useState<string>("");
    const [spTags, setSPTags] = useState<Array<string>>([""]);

    function editActionHandler(annotation: string, link: string, tags: Array<string>): void {
        // All this function does is replace the 
        // state of show pop page
        setSPTitle(annotation);
        setSPLink(link);
        setSPTags(tags);

        // set pop page visible
        if (showPopPage) {
            setPopPage(!showPopPage);
            setPopPage(!!showPopPage);
        } else {
            setPopPage(!showPopPage);
        }
    }
    /* link card edit action - end */

    /* Side Pop Page */
    const [showPopPage, setPopPage] = useState<boolean>(false);

    function togglePopPage(): void {
        setPopPage(!showPopPage);
    }

    /* End side pop page */

    /* Tooltip Body */
    function CreateToolTipBody(): JSX.Element {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Button onClick={e => toggleModal(createLink, setCreateLink)}>
                    Create Link
                </Button>
                <Spacer />
                <Button onClick={e => toggleModal(createCollection, setCreateCollection)}>
                    Create Collection
                </Button>
            </div>
        )
    }

    /* End Tooltip body */

    const Hello = gql`
    query {
        user {
            name, 
            email,
            links {
                annotation,
                tags,
                note,
                id,
                url
            }
        }
    }
    `;
    const { loading, error, data } = useQuery(Hello);

    if (loading) {
        toast.promise(new Promise((resolve, reject) => setTimeout(() => resolve("Hello"), Math.floor(Math.random() * 4000))), { loading: "Fetching Latest Data...", success: "Done", error: "Something Wrong Occurred" });
        return (
            <div className={styles.dashboardPage}>
                <Header />
                <div className={styles.dashboardSections}>
                    <section className={styles.foldersSection}>
                        <Search searchAction={(() => undefined)} />
                    </section>


                    <section className={styles.linksSection__loading}>
                        <Loading />
                    </section>
                </div>
                <Toaster />
            </div>
        )
    }

    if (error) {
        toast.error("Something Wrong Ocurred.");
        toast.error("Could not load data.");
        return (
            <div className={styles.dashboardPage}>
                <h2>Something Wrong Ocurred.</h2>
            </div>
        )
    }

    return (
        <div className={styles.dashboardPage}>
            <Header />
            <div className={styles.dashboardSections}>
                <section className={styles.foldersSection}>
                    <Search searchAction={(() => undefined)} />
                    <div className={styles.center}>
                        <Tooltip position="right" trigger="click" text={<CreateToolTipBody />}>
                            <Button>
                                Create
                            </Button>
                        </Tooltip>
                    </div>
                    <button onClick={() => togglePopPage()}>
                        Show Pop
                    </button>
                </section>


                <section className={styles.linksSection}>
                    <div className={styles.links}>
                        {data.user.links.map(link => {
                            console.log({ link: link })
                            return (
                                <LinkCard
                                    key={link.id}
                                    name={link.annotation}
                                    url={link.url}
                                    tags={link.tags}
                                    editAction={() => editActionHandler(link.annotation, link.url, link.tags)}
                                />
                            )
                        })}
                    </div>
                </section>
                <section style={showPopPage ? { display: "flex" } : { display: "none" }} className={styles.sidePopPage}>
                    <div className={styles.showPopPageContent}>
                        <div className={styles.showPopPageContentTitle}>
                            <div className={styles.closeShowPopPage}>
                                <p onClick={() => togglePopPage()}> X </p>
                            </div>
                            <div className={styles.showPopPageContentTitle}>
                                <h1> {spTitle} </h1>
                                <CopyLink link={spLink} />
                                <div className={styles.showPopPageTags}>
                                    {spTags.map(tag => {
                                        return <Tag key={tag} name={tag} />
                                    })}
                                </div>
                                <div className={styles.showPopPageNotes}>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            {/* Everything Else */}


            {/* Toasts */}
            <Toaster
                position="bottom-right"
            />
            {/* End Toasts */}

            {/* Modals */}

            {/* Create Link Modal */}
            <Modal visible={createLink}>
                <Modal.Title>
                    Create Link
                </Modal.Title>
                <Modal.Content>
                    <form className={styles.createLinkForm}>
                        <Input placeholder="URL e.g https://twitter.com" />
                        <Input placeholder="Annotation e.g Thread on mental health" />
                        <Input placeholder="Tags, separate the tags by commas e.g brain, health" />
                        <Button>
                            Save Link
                        </Button>
                    </form>
                </Modal.Content>
            </Modal>

            {/* Create collection Modal */}
            <Modal visible={createCollection}>

            </Modal>

            {/* End Modals */}
        </div >
    )
}

export default HomePage;