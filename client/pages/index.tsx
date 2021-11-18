import React, {
  FunctionComponent,
  useState,
  useEffect,
} from "react";
// import { AuthCtx } from "../contexts/auth";
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
import { Loading, Button, Tooltip, Spacer } from "@nextui-org/react";

import {
  Modal,
  Button as GButton,
  Divider,
  Tree,
  Display,
  Image,
  Card
} from "vercel-style";
import { Home } from "@geist-ui/react-icons";
import Link from "next/link";

// import graphql actions
import { FETCH_ALL } from "../graphql/actions";

import { truncateStr } from "../utils/string";
import { presetBgs } from "../utils/presets";

const AUTH_SERVICE: string = "https://auth.linksbook.me" // "https://auth.linksbook.me";

const HomePage: FunctionComponent = (): JSX.Element => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [plan, setPlan] = React.useState<string>("");
  const [hasToken, setHasToken] = useState<boolean>(false);

  React.useEffect(() => {
    /* Request... Check if user is authenticated */
    /* Is token in localstorage */
    const authToken = localStorage.getItem("token") ?? undefined;

    if (authToken !== undefined) {
      setHasToken(true);
      fetch(`${AUTH_SERVICE}/is-authenticated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authToken }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (authToken !== undefined && data.status !== "Failed") {
            console.log(data);
            setIsAuth(true);
            setName(data.userName);
            setPlan(data.plan);
          }
          /* console.log("Auth Data");
                  console.log(data); */
        });
    } else {
      setHasToken(false);
    }

  }, [hasToken]);

  /* The user and theme contexts */
  const [theme, setTheme] = useState<string>("");
  const [bgImage, setBgImage] = useState<string>("");

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    setBgImage(localStorage.getItem("bgImage"));
  }, [theme]);

  /*  */
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  async function saveUserPref() {
    localStorage.setItem("bgImage", backgroundImage);
    setShowSettings(false)
    toast("Saved Background Image Choice");
  }
  /*  */
  /* ... */

  /* link card edit button action handle */
  const [editLinkModal, setEditLinkModal] = useState<boolean>(false);
  /* edit link modal form fields props */
  const [currentLink, setCurrentLink] = useState<string>("");
  /* edit link modal form fields props - end */
  /* Settings modal */
  const [showSettings, setShowSettings] = useState<boolean>(false);
  /* End Settings modal */

  const [inFolder, setInFolder] = useState<boolean>(false);
  const [whichFolder, setWhichFolder] = useState<string>("");

  /* Show Pop page props; abbreviated 'sp' */

  const [spTitle, setSPTitle] = useState<string>("");
  const [spLink, setSPLink] = useState<string>("");
  const [spTags, setSPTags] = useState<Array<string>>([""]);
  const [spNote, setSPNote] = useState<string>("");

  function displayPopPage(
    id: string,
    annotation: string,
    link: string,
    tags: Array<string>,
    note: string
  ): void {
    // set current link by ID
    setCurrentLink(id);

    // All this function does is replace the
    // state of show pop page
    setSPTitle(annotation);
    setSPLink(link);
    setSPTags(tags);
    setSPNote(note !== null ? note : "Add note by editing link...");

    // set pop page visible
    if (showPopPage) {
      setPopPage(!showPopPage);
      setPopPage(!!showPopPage);
    } else {
      setPopPage(!showPopPage);
    }
  }

  function editActionHandler(
    id: string,
    annotation: string,
    link: string,
    tags: Array<string>,
    note: string
  ): void {
    // set current link by ID
    setCurrentLink(id);

    // All this function does is replace the
    // state of show pop page
    setSPTitle(annotation);
    setSPLink(link);
    setSPTags(tags);
    setSPNote(note !== null ? note : "Add note by editing link...");
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
        <Tooltip
          position="right"
          trigger="click"
          text={<CreateLinkForm getUpdatedData={(d) => getRefreshedData(d)} />}
        >
          <Button>Create Link</Button>
        </Tooltip>
        <Spacer />
        <Tooltip
          position="right"
          trigger="click"
          text={
            <CreateCollectionForm getUpdatedData={(d) => getRefreshedData(d)} />
          }
        >
          <Button>Create Collection</Button>
        </Tooltip>
      </div>
    );
  }

  /* End Tooltip body */
  let { loading, error, data } = useQuery(FETCH_ALL);
  const [displayLinks, setDisplayLinks] = useState<any>([]);

  /* Search Handler */
  function handleSearch(query: string): void {
    let allLinks: Array<any> = data.user.links;
    let toDisplayLinks: Array<any> = [];

    allLinks.forEach((link) => {
      if (
        link?.annotation?.toLowerCase().includes(query.toLowerCase()) ||
        link?.note?.toLowerCase().includes(query.toLowerCase()) ||
        link?.url?.toLowerCase().includes(query.toLowerCase())
      ) {
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

    allLinks.forEach((link) => {
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
      //console.log(data);
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

  if (!hasToken) {
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card style={{ padding: "2em" }} shadow>
          <h4>You cannot access this page.</h4>
          Consider <Link href="/auth">Creating an account</Link> or <Link href="/auth/login">Logging In</Link>
        </Card>
      </div>
    )
  }

  if (loading) {
    // toast.promise(new Promise((resolve, _reject) => setTimeout(() => resolve("Hello"), Math.floor(Math.random() * 4000))), { loading: "Fetching Latest Data...", success: "Done", error: "Something Wrong Occurred" });
    return (
      <div className={styles.dashboardPage}>
        <Header name={""} />
        <div className={styles.dashboardSections}>
          <section className={styles.foldersSection}></section>

          <section className={styles.linksSection__loading}>
            <Loading />
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    //console.log(error);
    toast.error("Something Wrong Ocurred.");
    toast.error("Could not load data.");
    return (
      <div className={styles.errorPage}>
        <h1>Something Wrong Occurred</h1>
      </div>
    );
  }

  return (
    <div
      style={
        theme === "image"
          ? {
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "100vw 100vh",
          }
          : theme === "image_blur"
            ? {
              backgroundImage: `url("${bgImage}")`,
              backgroundSize: "100vw 100vh",
              backdropFilter: "blur(4px)",
            }
            : theme === "dark"
              ? { backgroundColor: "#0d1117", color: "white" }
              : { backgroundColor: "white", color: "black" }
      }
      className={styles.dashboardPage}
    >
      <Header
        name={name}
        toggleSettings={() => setShowSettings(!showSettings)}
      />
      <div className={styles.dashboardSections}>
        <section
          style={showPopPage ? { display: "none" } : { display: "block" }}
          className={styles.foldersSection}
        >
          <div
            style={{
              margin: "0.2em 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search searchAction={(q: string) => handleSearch(q)} />
          </div>
          <div className={styles.center}>
            <Tooltip
              position="right"
              trigger="click"
              text={<CreateToolTipBody />}
            >
              <Button>Create</Button>
            </Tooltip>
          </div>
          <div className={styles.folders}>
            <Tree style={{ overflow: "scroll" }}>
              {data.user.collections.map((folder, idx) => {
                if (folder.parent.match(/NONE/)) {
                  return (
                    <Folder
                      key={folder.id}
                      plan={plan}
                      label={folder.name}
                      index={idx}
                      id={folder.id}
                      folder={folder}
                      /* thirdPartyAction={(links, folderId) => setToDisplayLinks(links, folder.id)} */
                      getUpdatedData={(data) => getRefreshedData(data)}
                      setLinks={(links, fId) => setToDisplayLinks(links, fId)}
                    />
                  );
                }
              })}
            </Tree>

            {/* */}
          </div>
        </section>

        <section className={styles.linksSection}>
          <Home onClick={() => setDisplayLinks(data.user.links)} />
          <div className={styles.links}>
            {/* <Spacer y={6} /> */}
            {displayLinks.map((link) => {
              //console.log({ link: link });
              return (
                <LinkCard
                  key={link.id}
                  plan={plan}
                  linkData={link}
                  id={link.id}
                  name={link.annotation}
                  url={link.url}
                  tags={link.tags}
                  inFolder={inFolder}
                  folderId={whichFolder}
                  viewAction={() =>
                    displayPopPage(
                      link.id,
                      link.annotation,
                      link.url,
                      link.tags,
                      link.note
                    )
                  }
                  editAction={() => {
                    editActionHandler(
                      link.id,
                      link.annotation,
                      link.url,
                      link.tags,
                      link.note
                    );
                    setEditLinkModal(!editLinkModal);
                  }}
                  getUpdatedData={(d) => getRefreshedData(d)}
                  tagSearchHandler={(t) => searchLinksWithTag(t)}
                />
              );
            })}
            <Spacer y={3} />
            {/* <Spacer y={3} /> */}
          </div>
        </section>
        <section
          style={showPopPage ? { display: "flex" } : { display: "none" }}
          className={styles.sidePopPage}
        >
          <div className={styles.showPopPageContent}>
            <div className={styles.showPopPageContentTitle}>
              <div className={styles.closeShowPopPage}>
                <p onClick={() => togglePopPage()}> X </p>
                <GButton
                  onClick={(_) => setEditLinkModal(!editLinkModal)}
                  auto
                  scale={0.35}
                  type="secondary"
                >
                  Edit
                </GButton>
              </div>
              <div className={styles.showPopPageContentTitle}>
                <h1 className={styles.showPopLinkTitle}>
                  {" "}
                  {truncateStr(spTitle, 40)}{" "}
                </h1>
                <CopyLink link={spLink} />
                <div className={styles.showPopPageTags}>
                  {spTags.map((tag) => {
                    return <Tag key={tag} name={tag} />;
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
        <Modal.Title>Edit Link</Modal.Title>
        <Modal.Content>
          <UpdateLink
            plan={plan}
            title={spTitle}
            url={spLink}
            tags={spTags.join(" ")}
            note={spNote}
            currentLink={currentLink}
            handleFormSubmit={(v) => setEditLinkModal(v)}
            getUpdatedData={(v) => getRefreshedData(v)}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setEditLinkModal(false)}>
          Cancel
        </Modal.Action>
      </Modal>
      {/* End Edit Links Modal */}

      {/* Settings Modal */}
      <Modal visible={showSettings} onClose={() => setShowSettings(false)}>
        <Modal.Title>Settings</Modal.Title>
        <Modal.Content>
          <Divider />
          <h3>Choose a Background Image</h3>
          <div className={styles.userMenuBgs}>
            {presetBgs.map((bg) => {
              return (
                <div className={styles.aCustomBg}>
                  <Display shadow>
                    <Image
                      onClick={() => setBackgroundImage(bg)}
                      src={bg}
                      width="100px"
                      height="70px"
                    />
                  </Display>
                </div>
              );
            })}
          </div>
          <Divider />
        </Modal.Content>
        <Modal.Action passive onClick={() => setShowSettings(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => saveUserPref()}>Save</Modal.Action>
      </Modal>
      {/* End settings modal */}

      {/* End Modals */}
    </div>
  );
};

export default HomePage;
