import React, { useState, useEffect } from "react";
import styles from "../../styles/dash.module.css";

import LinksBook from "../../components/LinksBook";
import NoLinksBook from "../../components/NoLinksBook";
import Image from "next/image";
import Link from "next/link";

const jwt = require("jsonwebtoken");

const SECRET = "dbc14b4421adca6801ec245c47659da6a9537dbb4993056f92fab26696190de452afd85e1a75b64953d04a58a9ad6230b3963c1c6074c786509936ec6a11bec4";


function ShareModal({ link }) {
    return (
    <div className={styles.shareModal}>
    <div>
        <h2>Share the following link</h2>
        <span>
        <a href={`https://linksbook.vercel.app/public/${link}`}>
            {`https://linksbook.vercel.app/public/${link}`}
        </a>
        </span>
    </div>
</div>
    )
}

const Dashboard = () => {

    // page variables
    const [LinksBooks, setLinksBooks] = useState(false);
    const [link, setLink] = useState(false);
    const [User, setUser] = useState({});
    const [isAuth, setisAuth] = useState(false);

    function isAuthe() {
        if (localStorage.getItem("token")) {
            setisAuth(true)
        } else {
            false
        }
    }

    function fetchAndSetCredentials() {
        if (User.name === undefined || User.name === "" && isAuth === true) {
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

    useEffect(() => {
        fetchAndSetCredentials();
        fetchAndSetLinksBooks();
        isAuthe();
    }, [link]);

    useEffect(() => setLink(true))

    function fetchAndSetLinksBooks() {
        fetch(`https://linksbook-server.vercel.app/getlinksbook/${User.id}`)
            .then(res => res.json())
            .then(data => {
                setLinksBooks(data)
                console.log("Data")
                console.log(data)
                setLink(true);
        })
    }

    // variables for create linksbook modal
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Public, setPublic] = useState(false);
    const [open, setOpen] = useState(false);

    function toggleOpen(value, handler) {
        if (value) {
            handler(false);
        } else {
            handler(true);
        }
    }

    const valueChangeHandler = (event, handler) => {
        handler(event.target.value);
    }

    const viewChangeHandler = (value, handler) => {
        if (value) {
            handler(false);
        } else {
            handler(true);
        }
    }

    function submitNewLinksBook(event) {
        //event.preventDefault();
        const newLinksBook = {
            title: title,
            description,
            public: Public
        }

        fetch(`https://linksbook-server.vercel.app/createlinksbook/${User.id}`, {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLinksBook)
        }).then(res => res.json())
            .then(data => console.log(data))

        setOpen(false);
        setTitle("");
        setDescription("");
    }

    // share modal
    const [modal, setModal] = useState(false);

    function toggleShareModal(link) {
        if (modal) {
            setModal(false);
        } else {
            console.log(link)
            setModal(<ShareModal link={link} />)
        }
    }

    function logOut() {
        localStorage.removeItem("token");
    }

    // localStorage.getItem("token") !== {} || "" || " " || undefined
    if (isAuth === false) {
        return (
            <div className={styles.notAuthPage}>
            <h1>You are not authenticated</h1>
                    <div className={styles.notAuthPageAuth}>
                    <Link href="/login">
                        <button>
                            Log-In
                        </button>
                    </Link>
                    <Link href="signup">
                        <button>
                            Sign-Up
                        </button>
                    </Link>
                </div>
            </div> 
            
        )
    }

    return (
        <div className={styles.page}>
                <header className={styles.header}>
                <span className={styles.logo}>
                    <Link href="/">
                        <Image src="/book.svg" width="50" height="50" />
                    </Link>
                </span>

                <span className={styles.userThings}>
                    <h2> {User.name} </h2>
                    <button onClick={() => logOut()} className={styles.logOutButton}>Log Out</button>
                </span>
            </header>

                <div className={styles.modalContainer}>
                {open ?
                <div className={styles.createNewLinksBookModal}>
                    <form onSubmit={(e) => submitNewLinksBook(e)}>
                        <input value={title} onChange={(e) => valueChangeHandler(e, setTitle)} type="text" placeholder="Name" />
                        <input value={description} onChange={(e) => valueChangeHandler(e, setDescription)} type="text" placeholder="Description" />
                        <label htmlFor="public">Public</label> <input onChange={() => viewChangeHandler(Public, setPublic)} type="checkbox"/>
                        <button>
                            Create
                        </button>
                    </form>
                </div>
                : <div className={styles.createNewLinksBookModalInvisible}>
                    <form>
                        <input onChange={(e) => valueChangeHandler(e, setName)} type="text" placeholder="Name" />
                        <input onChange={(e) => valueChangeHandler(e, setDescription)} type="text" placeholder="Description" />
                        <label htmlFor="public">Public</label> <input onChange={() => viewChangeHandler(newPublic, setNewPublic)} type="checkbox"/>
                        <button>
                            Create
                        </button>
                    </form>
                </div>}
            </div>
            
                {
                    modal ? modal : ""
                }

            <main className={styles.links}>
                {( LinksBooks === false || LinksBooks.length === 0) ? <NoLinksBook  what="Collections" />
                : LinksBooks.map(linkbook => {
                    return (
                        
                            <LinksBook 
                            title={linkbook.title}
                            description={linkbook.description}
                            link={linkbook._id}
                            view={linkbook.public}
                            shareHandler={toggleShareModal}
                        />
                        
                    )
                })}
            </main>
            
                <div className={styles.actions}>
                    <button onClick={() => toggleOpen(open, setOpen)} className={styles.createnNewLinksBookButton}>
                        New Collection
                    </button>
                </div>
        </div>
    )       
}


export default Dashboard;
