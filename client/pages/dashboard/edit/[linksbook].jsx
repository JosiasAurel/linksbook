import React, { useState, useEffect } from "react";
import styles from "../../../styles/dash.module.css";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";

const EditLinksBook = (props) => {

    //credentials
    const [User, setUser] = useState({});

    const router = useRouter();

    function fetchAndSetCredentials() {
        if (User.name === undefined || User.name === "") {
            let user_ = localStorage.getItem("token").split(" ");
        let userObj = {
            name: user_[0],
            email: user_[1],
            id: user_[2]
        }

        setUser(userObj);
        } else {
            return
        }

    }

    useEffect(() => {
        fetchAndSetCredentials();
        fetchLink();
    }, [])

    let linkid = props.pageProps.id.linksbook;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Public, setPublic] = useState(false);

    function fetchLink() {
        fetch(`http://localhost:4000/linksbook/${linkid}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
            });
    }

    function submitHandler(e) {
        e.preventDefault();
        let editedLinksBook = {
            title: title,
            description, description,
            isPublic: Public
        }
        fetch(`http://localhost:4000/setlinksbook/${linkid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedLinksBook)
        }).then(res => res.json())
            .then(data => {
                router.push("/dashboard")
            })
    }

    const toggleView = () => {
        if (Public) {
            setPublic(false);
        } else {
            setPublic(true);
        }
    }

    const changeHandler = (e, handler) => {
        handler(e.target.value);
    }

    console.log(linkid)
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
                </span>
            </header>
    <div className={styles.editFormContainer}>
            <form action="" onSubmit={(e) => submitHandler(e)}>
                <input value={title} onChange={(e) => changeHandler(e, setTitle)} type="text" placeholder="new Title" />
                <input value={description} onChange={(e) => changeHandler(e, setDescription)} type="text" placeholder="new Description" />
                <label htmlFor="public">Public</label> <input onChange={() => toggleView()} type="checkbox" />
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

export default EditLinksBook;