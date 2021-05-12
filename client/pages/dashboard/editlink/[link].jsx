import React, { useState, useEffect } from "react";

import styles from "../../../styles/dash.module.css";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const jwt = require("jsonwebtoken");
const SECRET = "dbc14b4421adca6801ec245c47659da6a9537dbb4993056f92fab26696190de452afd85e1a75b64953d04a58a9ad6230b3963c1c6074c786509936ec6a11bec4";

const EditLink = (props) => {

    const router = useRouter();

    let linkId = props.pageProps.id.link;
    console.log(linkId)

    // credentials
    const [User, setUser] = useState({});
    const [LLink, setLLink] = useState({});

    const [dep, setDep] = useState(false);

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

    function fetchLink() {
        fetch(`https://linksbook-server.vercel.app/link/${linkId}`)
            .then(res => res.json())
            .then(data => {
                setLLink(data)
                setTitle(data.title);
                setDescription(data.description);
                setLink(data.link);
            });
    }

    useEffect(() => {
        fetchAndSetCredentials();
        fetchLink();
    }, [])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const changeHandler = (e, handler) => {
        handler(e.target.value);
    }


    function submitHandler(e) {
        e.preventDefault();
        let newLink = {
            title: title,
            link: link,
            description: description
        }

        fetch(`https://linksbook-server.vercel.app/setlink/${linkId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLink)
        }).then(res => res.json())
            .then(data => {
                router.back();
            })
    }

    function logOut() {
        localStorage.removeItem("token");
    }
    
    return (
        <div>
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
    <div className={styles.editFormContainer}>
            <form action="" onSubmit={(e) => submitHandler(e)}>
                <input value={title} onChange={(e) => changeHandler(e, setTitle)} type="text" placeholder="new Title" />
                <input value={description} onChange={(e) => changeHandler(e, setDescription)} type="text" placeholder="new Description" />
                <input value={link} onChange={(e) => changeHandler(e, setLink)} type="url" placeholder="Enter new URL" />
                <button type="submit">
                    Apply
                </button>
            </form>
        </div>
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

export default EditLink;
