import React, { useEffect, useState } from "react";
import styles from "../../styles/dash.module.css";
import LinkCard from "../../components/Link";
import Link from "next/link";
import Image from "next/image";
import NoLinksBook from "../../components/NoLinksBook";

const jwt = require("jsonwebtoken");
const SECRET = "dbc14b4421adca6801ec245c47659da6a9537dbb4993056f92fab26696190de452afd85e1a75b64953d04a58a9ad6230b3963c1c6074c786509936ec6a11bec4";

const LinksPage = (props) => {
    const [linkBookId, setLinkBookId] = useState(props.pageProps.id.id);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        console.log(linkBookId)
        fetchLinks()
        fetchAndSetCredentials();
    }, [])

    function fetchLinks() {
        fetch(`https://linksbook-server.vercel.app/getlinks/${linkBookId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLinks(data)
            })
    }
    
   const [label, setLabel] = useState("");
   const [description, setDescription] = useState("");
   const [link, setLink] = useState("");
   const [open, setOpen] = useState(false);
   const [created, setCreated] = useState(false);
    const [User, setUser] = useState({});

    function fetchAndSetCredentials() {
        if (User.name === undefined || User.name === "") {
            let user_ = jwt.verify(localStorage.getItem("token"), SECRET);
        let userObj = {
            name: user_.name,
            id: user_.id
        }

        setUser(userObj);
        } else {
            return
        }

    }

   function handleValuehChange(event, handler) {
        handler(event.target.value);
   }

   function submitNewLink(event) {
       // event.preventDefault();
       let newLinkObj = {
           title: label,
           description: description, 
           link: link
       }
       fetch(`https://linksbook-server.vercel.app/createlink/${User.id}/${linkBookId}`, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(newLinkObj)
       })
        .then(res => res.json())
        .then(data => console.log(data))
        setOpen(false);
        setLabel("");
        setDescription("");
        setLink("");
        setCreated(true);
        setTimeout(() => setCreated(false), 1500);
   }

   function handleLinkCreation(event) {
       if (label.trim() !== "" && description.trim() !== "" && link.trim() !== "") {
           submitNewLink(event);
       } else {
           alert("Some fields are empty");
       }
   }

   function toggleModal() {
       if (open) {
           setOpen(false)
       } else {
           setOpen(true)
       }
   }

   function logOut() {
        localStorage.removeItem("token");
    }
    
    return (
        <div className={styles.linksPage}>
            <header className={styles.header}>
                <span className={styles.logo}>
                    <Link href="/">
                        <Image src="/book.svg" width="50" height="50" />
                    </Link>
                </span>
                    <span className={styles.toDashLinksPage}>
                        <Link href="/dashboard">
                            <p>Dashboard</p>
                        </Link>
                    </span>
                <span className={styles.userThings}>
                    <h2> {User.name} </h2>
                    <button onClick={() => logOut()} className={styles.logOutButton}>Log Out</button>
                </span>
            </header>
            <section className={styles.linksPageLinksContainer}>
                <main className={styles.linksPageLinks}>
                { links.length === 0 ? <NoLinksBook what="Links" padLeft="-20px" />
                    :
                    links.map(link => {
                    return (
                        <LinkCard 
                        title={link.title}
                        description={link.description}
                        link={link.link}
                        id={link._id}
                        />
                    )
                })  
            }
            </main>
            </section>

            <div className={styles.createNewLinkContainer}>
                <button onClick={() => toggleModal()}>
                    New Link
                </button>
            </div>

            {open ? 
            <div className={styles.newLinkModal}>
                <form onSubmit={(e) => handleLinkCreation(e)}>
                    <h2>Create New Link</h2>
                    <input value={label} onChange={(e) => handleValuehChange(e, setLabel)} type="text" placeholder="Label" />
                    <input value={description} onChange={(e) => handleValuehChange(e, setDescription)} type="text" placeholder="Description" />
                    <input value={link} onChange={(e) => handleValuehChange(e, setLink)} type="url" placeholder="Link" />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>
            : 
            <div className={styles.newLinkModalClosed}>
                <form>
                    <h2>Create New Link</h2>
                    <input value={label} onChange={(e) => handleValuehChange(e, setLabel)} type="text" placeholder="Label" />
                    <input value={description} onChange={(e) => handleValuehChange(e, setDescription)} type="text" placeholder="Description" />
                    <input value={link} onChange={(e) => handleValuehChange(e, setLink)} type="url" placeholder="Link" />
                    <button type="submit">
                        Create
                    </button>
                </form>
            </div>}

            {created ?
            <div className={styles.linkCreated}>
                <h2>Link Created</h2>
            </div>
            :
            <div className={styles.linkCreatedClosed}>
                <h2>Link Created</h2>
            </div>}
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
