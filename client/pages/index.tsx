import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import { useMutation, useQuery } from "@apollo/client";

import Header from "../components/Header";
import Search from "../components/Search";
import LinkCard from "../components/LinkCard";
import CopyLink from "../components/CopyLink";
import Tag from "../components/Tag";
import CreateLinkForm from "../components/createLink";
import Note from "../components/Note";
import UpdateLink from "../components/updateLink";

import styles from "../styles/index.module.css";

import toast, { Toaster } from "react-hot-toast";
import { Loading, Button, Tooltip, Spacer } from '@nextui-org/react';

import { Modal, Button as GButton } from "@geist-ui/react";

// import graphql actions
import { FETCH_ALL } from "../graphql/actions";

import { truncateStr } from "../utils/string";

const HomePage: FunctionComponent = (): JSX.Element => {

    /* Create Link/Collection Modal states */
    const [createCollection, setCreateCollection] = useState<boolean>(false);
    function toggleModal(state, handler): void {
        handler(!state);
    }
    /*  */

    /* link card edit button action handle */
    const [editLinkModal, setEditLinkModal] = useState<boolean>(false);
    /* edit link modal form fields props */
    const [currentLink, setCurrentLink] = useState<string>("");
    /* edit link modal form fields props - end */

    /* Show Pop page props; abbreviated 'sp' */

    const [spTitle, setSPTitle] = useState<string>("");
    const [spLink, setSPLink] = useState<string>("");
    const [spTags, setSPTags] = useState<Array<string>>([""]);
    const [spNote, setSPNote] = useState<string>("");

    function editActionHandler(id: string, annotation: string, link: string, tags: Array<string>, note: string): void {
        // set current link by ID
        setCurrentLink(id);

        // All this function does is replace the 
        // state of show pop page
        setSPTitle(annotation);
        setSPLink(link);
        setSPTags(tags);
        setSPNote((note !== null) ? note : "Add note by editing link...");

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
                <Tooltip position="right" trigger="click" text={<CreateLinkForm />}>
                    <Button>
                        Create Link
                    </Button>
                </Tooltip>
                <Spacer />
                <Button onClick={e => toggleModal(createCollection, setCreateCollection)}>
                    Create Collection
                </Button>
            </div>
        )
    }

    /* End Tooltip body */

    const { loading, error, data } = useQuery(FETCH_ALL);
    /*     if (data) console.log(data); */

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
            <div className={styles.errorPage}>
                <h1>Something Wrong Occurred</h1>
            </div>
        )
    }

    return (
        <div className={styles.dashboardPage}>
            <Header />
            <div className={styles.dashboardSections}>
                <section style={showPopPage ? { display: "none" } : { display: "block" }} className={styles.foldersSection}>
                    <Search searchAction={(() => undefined)} />
                    <div className={styles.center}>
                        <Tooltip position="right" trigger="click" text={<CreateToolTipBody />}>
                            <Button>
                                Create
                            </Button>
                        </Tooltip>
                    </div>
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
                                    editAction={() => editActionHandler(link.id, link.annotation, link.url, link.tags, link.note)}
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
                                <GButton onClick={_ => setEditLinkModal(!editLinkModal)} auto scale={0.35} type="secondary">Edit</GButton>
                            </div>
                            <div className={styles.showPopPageContentTitle}>
                                <h1 className={styles.showPopLinkTitle}> {truncateStr(spTitle, 40)} </h1>
                                <CopyLink link={spLink} />
                                <div className={styles.showPopPageTags}>
                                    {spTags.map(tag => {
                                        return <Tag key={tag} name={tag} />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.notesSection}>
                            <Note note={spNote} />
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
            {/* Edit Link Modal */}
            <Modal visible={editLinkModal} onClose={() => setEditLinkModal(false)}>
                <Modal.Title>
                    Edit Link
                </Modal.Title>
                <Modal.Content>
                    <UpdateLink
                        title={spTitle}
                        url={spLink}
                        tags={spTags.join(",")}
                        note={spNote}
                        currentLink={currentLink}
                    />
                </Modal.Content>
                <Modal.Action passive onClick={() => setEditLinkModal(false)}>
                    Cancel
                </Modal.Action>
            </Modal>
            {/* Create collection Modal */}
            <Modal visible={createCollection}>

            </Modal>

            {/* End Modals */}
        </div >
    )
}

export default HomePage;