import React, { FunctionComponent, useState, useEffect, useContext, FormEvent } from "react";
import { AuthCtx } from "../contexts/auth";
import { useQuery } from "@apollo/client";


import Header from "../components/Header";
import Search from "../components/Search";
import LinkCard from "../components/LinkCard";
import CopyLink from "../components/CopyLink";
import Tag from "../components/Tag";
import CreateLinkForm from "../components/createLink";
import CreateCollectionForm from "../components/createCollection";
import Note from "../components/Note";
import UpdateLink from "../components/updateLink";
import Folder from "../components/Folder";

import styles from "../styles/index.module.css";

import toast from "react-hot-toast";
import { Loading, Button, Tooltip, Spacer } from '@nextui-org/react';

import { Modal, Button as GButton, Divider, Tree } from "@geist-ui/react";
import { Home, Image } from "@geist-ui/react-icons";

// import graphql actions
import { FETCH_ALL } from "../graphql/actions";

import { truncateStr } from "../utils/string";

const API_SERVICE: string = process.env.NEXT_PUBLIC_API_SERVICE;

const HomePage: FunctionComponent = (): JSX.Element => {

    /* The user and theme contexts */
    const theme = useContext(AuthCtx);
    console.log("Theme Ctx");
    console.log(theme);
    /* ... */

    /* link card edit button action handle */
    const [editLinkModal, setEditLinkModal] = useState<boolean>(false);
    /* edit link modal form fields props */
    const [currentLink, setCurrentLink] = useState<string>("");
    /* edit link modal form fields props - end */
    /* Settings modal */
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [uploadBgFile, setUploadBgFile] = useState<any>();
    const [fileType, setFileType] = useState<string>("");

    function handleFileChange(event: any, handler: Function): void {
        // console.log(event.target.files[0]);
        setFileType(event.target.files[0].type.split("/")[1]);

        /* const fileReader = new FileReader();

        fileReader.addEventListener("load", event_ => {
            // console.log(event_.target.result);
            handler(event_.target.result);
        });
        fileReader.readAsArrayBuffer(event.target.files[0]); */

        handler(event.target.files[0]);
    }

    async function handleUploadBgImage(event: FormEvent): Promise<void> {
        event.preventDefault();

        const authToken: string | undefined = localStorage.getItem("token") ?? undefined;

        const formData = new FormData();
        let file = new Blob([uploadBgFile]);
        // file = uploadBgFile;

        formData.append(`filename`, file);

        const res = await fetch(`${API_SERVICE}/upload-image`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const data = await res.json();
        console.log(data);
    }
    /* End Settings modal */

    const [inFolder, setInFolder] = useState<boolean>(false);
    const [whichFolder, setWhichFolder] = useState<string>("");

    /* Show Pop page props; abbreviated 'sp' */

    const [spTitle, setSPTitle] = useState<string>("");
    const [spLink, setSPLink] = useState<string>("");
    const [spTags, setSPTags] = useState<Array<string>>([""]);
    const [spNote, setSPNote] = useState<string>("");

    function displayPopPage(id: string, annotation: string, link: string, tags: Array<string>, note: string): void {
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

    function editActionHandler(id: string, annotation: string, link: string, tags: Array<string>, note: string): void {
        // set current link by ID
        setCurrentLink(id);

        // All this function does is replace the 
        // state of show pop page
        setSPTitle(annotation);
        setSPLink(link);
        setSPTags(tags);
        setSPNote((note !== null) ? note : "Add note by editing link...");
    }
    /* link card edit action - end */

    /* Side Pop Page */
    const [showPopPage, setPopPage] = useState<boolean>(false);

    function togglePopPage(): void {
        setPopPage(!showPopPage);
    }

    /* End side pop page */

    /* Tooltip Body */
    // const [createLinkTooltip, setCreateLinkTooltip] = useState<boolean>(false);
    function CreateToolTipBody(): JSX.Element {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Tooltip position="right" trigger="click" text={<CreateLinkForm getUpdatedData={d => getRefreshedData(d)} />}>
                    <Button>
                        Create Link
                    </Button>
                </Tooltip>
                <Spacer />
                <Tooltip position="right" trigger="click" text={<CreateCollectionForm getUpdatedData={d => getRefreshedData(d)} />}>
                    <Button>
                        Create Collection
                    </Button>
                </Tooltip>
            </div>
        )
    }

    /* End Tooltip body */
    let { loading, error, data } = useQuery(FETCH_ALL);
    const [displayLinks, setDisplayLinks] = useState<any>([]);

    /* Search Handler */
    function handleSearch(query: string): void {
        let allLinks: Array<any> = data.user.links;
        let toDisplayLinks: Array<any> = [];

        allLinks.forEach(link => {
            if (link?.annotation?.toLowerCase().includes(query.toLowerCase()) || link?.note?.toLowerCase().includes(query.toLowerCase()) || link?.url?.toLowerCase().includes(query.toLowerCase())) {
                toDisplayLinks.push(link);
            } else {
            }
        });
        /* console.log("To display links")
        console.log(toDisplayLinks); */

        if (toDisplayLinks.length > 0) {
            setDisplayLinks(toDisplayLinks);
        } else {
            toast.error(`Could not find bookmark matching search "${query}"`);
        }
    }
    /* End Search Handler */

    /* Tag Search Handler */
    function searchLinksWithTag(tag: string): void {
        let allLinks: Array<any> = data.user.links;
        let toDisplayLinks: Array<any> = [];

        allLinks.forEach(link => {
            if (link?.tags?.join("").includes(tag)) {
                toDisplayLinks.push(link);
            } else {
            }
        });

        if (toDisplayLinks.length > 0) {
            setDisplayLinks(toDisplayLinks);
        } else {
            toast.error(`Could not find bookmark with tag "${tag}"`);
        }
    }
    /* End Tag Search Handler */

    function setToDisplayLinks(links: Array<any>, folderId?: string): any {
        setDisplayLinks(links);
        setInFolder(true);
        setWhichFolder(folderId);
        /* console.log("To Display Links and Folder")
        console.table({ links, folderId, inFolder }); */
    }

    // when the component is mounted
    useEffect(() => {
        if (data) {
            setDisplayLinks(data.user.links);
        }
    }, [data]);

    /* Folder actions */
    // impure function
    function handleFolderSelect(folderIndex: number): void {
        let folderLinks = data.user.collections[folderIndex].links;
        setDisplayLinks(folderLinks);
    }
    /* End Folder actions */

    // update all links after edit
    function getRefreshedData(datav: any): void {
        data = datav;
    }


    if (loading) {
        toast.promise(new Promise((resolve, _reject) => setTimeout(() => resolve("Hello"), Math.floor(Math.random() * 4000))), { loading: "Fetching Latest Data...", success: "Done", error: "Something Wrong Occurred" });
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
            </div>
        )
    }

    if (error) {
        console.log(error);
        toast.error("Something Wrong Ocurred.");
        toast.error("Could not load data.");
        return (
            <div className={styles.errorPage}>
                <h1>Something Wrong Occurred</h1>
            </div>
        )
    }

    return (
        <div /* style={{ backgroundColor: "#0d1117" }} */ className={styles.dashboardPage}>
            <Header
                toggleSettings={() => setShowSettings(!showSettings)}
            />
            <div className={styles.dashboardSections}>
                <section style={showPopPage ? { display: "none" } : { display: "block" }} className={styles.foldersSection}>
                    <Search searchAction={(q: string) => handleSearch(q)} />
                    <div className={styles.center}>
                        <Tooltip position="right" trigger="click" text={<CreateToolTipBody />}>
                            <Button>
                                Create
                            </Button>
                        </Tooltip>
                    </div>
                    <div className={styles.folders}>
                        <Tree>
                            {data.user.collections.map((folder, idx) => {
                                if ((folder.parent).match(/NONE/)) {
                                    return (
                                        <Folder
                                            key={folder.id}
                                            label={folder.name}
                                            index={idx}
                                            id={folder.id}
                                            folder={folder}
                                            /* thirdPartyAction={(links, folderId) => setToDisplayLinks(links, folder.id)} */
                                            getUpdatedData={data => getRefreshedData(data)}
                                            setLinks={(links, fId) => setToDisplayLinks(links, fId)}
                                        />
                                    )
                                } else { return "" }
                            })}
                        </Tree>

                        {/* */}
                    </div>
                </section>


                <section className={styles.linksSection}>
                    <Home onClick={() => setDisplayLinks(data.user.links)} />
                    <div className={styles.links}>
                        {/* <Spacer y={6} /> */}
                        {displayLinks.map(link => {
                            console.log({ link: link })
                            return (
                                <LinkCard
                                    key={link.id}
                                    id={link.id}
                                    name={link.annotation}
                                    url={link.url}
                                    tags={link.tags}
                                    inFolder={inFolder}
                                    folderId={whichFolder}
                                    viewAction={() => displayPopPage(link.id, link.annotation, link.url, link.tags, link.note)}
                                    editAction={() => { editActionHandler(link.id, link.annotation, link.url, link.tags, link.note); setEditLinkModal(!editLinkModal) }}
                                    getUpdatedData={d => getRefreshedData(d)}
                                    tagSearchHandler={t => searchLinksWithTag(t)}
                                />
                            )
                        })}
                        <Spacer y={3} />
                        {/* <Spacer y={3} /> */}
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
                        tags={spTags.join(" ")}
                        note={spNote}
                        currentLink={currentLink}
                        handleFormSubmit={v => setEditLinkModal(v)}
                        getUpdatedData={v => getRefreshedData(v)}
                    />
                </Modal.Content>
                <Modal.Action passive onClick={() => setEditLinkModal(false)}>
                    Cancel
                </Modal.Action>
            </Modal>
            {/* End Edit Links Modal */}

            {/* Settings Modal */}
            <Modal visible={showSettings} onClose={() => setShowSettings(false)}>
                <Modal.Title>
                    Settings
                </Modal.Title>
                <Modal.Content>
                    <div>
                        Some stuff here...
                    </div>
                    <Divider />
                    <h3>Choose a Background Image</h3>
                    <div>

                    </div>
                    <Divider />
                    <h3>Upload Custom Background Image</h3>
                    <div>
                        <form onSubmit={e => handleUploadBgImage(e)} className={styles.uploadBgForm} /* action={`${API_SERVICE}/upload-image`} */ /* encType="multipart/form-data" method="post" */>
                            <input onChange={e => handleFileChange(e, setUploadBgFile)} type="file" name="bgImg" id="bgImg" accept="image/png, image/jpeg" />
                            <div className={styles.imageDec}>
                                <Image />
                            </div>
                            <GButton type="success" auto width={"20%"} htmlType="submit">
                                Save
                            </GButton>
                        </form>
                    </div>
                </Modal.Content>
            </Modal>
            {/* End settings modal */}

            {/* End Modals */}
        </div >
    )
}

export default HomePage;