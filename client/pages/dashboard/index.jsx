import React, { useState, useEffect } from "react";
import styles from "../../styles/dash.module.css";

import LinksBook from "../../components/LinksBook";
import NoLinksBook from "../../components/NoLinksBook";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {

    // page variables
    const [LinksBooks, setLinksBooks] = useState(false);
    const [link, setLink] = useState(false);
    const [User, setUser] = useState({});

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
        fetchAndSetLinksBooks();
    }, [link]);

    useEffect(() => setLink(true))

    function fetchAndSetLinksBooks() {
        fetch(`http://localhost:4000/getlinksbook/${User.id}`)
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
    const [open, setOpen] = useState(false);
    const [created, setCreated] = useState(false);

    function toggleOpen() {
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    const valueChangeHandler = (event, handler) => {
        handler(event.target.value);
    }

    function submitNewLinksBook(event) {
        //event.preventDefault();
        const newLinksBook = {
            title: title,
            description
        }

        fetch(`http://localhost:4000/createlinksbook/${User.id}`, {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLinksBook)
        }).then(res => res.json())
            .then(data => console.log(data))

        setOpen(false);
        setCreated(true);
        const handleThisthing = () => setCreated(false);
        setTimeout(handleThisthing, 1500);
        setTitle("");
        setDescription("");
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
                </span>
            </header>

            <div className={styles.modalContainer}>
                {open ?
                <div className={styles.createNewLinksBookModal}>
                    <form onSubmit={(e) => submitNewLinksBook(e)}>
                        <input value={title} onChange={(e) => valueChangeHandler(e, setTitle)} type="text" placeholder="Name" />
                        <input value={description} onChange={(e) => valueChangeHandler(e, setDescription)} type="text" placeholder="Description" />
                        <button>
                            Create
                        </button>
                    </form>
                </div>
                : <div className={styles.createNewLinksBookModalInvisible}>
                    <form>
                        <input onChange={(e) => valueChangeHandler(e, setName)} type="text" placeholder="Name" />
                        <input onChange={(e) => valueChangeHandler(e, setDescription)} type="text" placeholder="Description" />
                        <button>
                            Create
                        </button>
                    </form>
                </div>}
            </div>

    {created ? 
    <div className={styles.linksbookAlert}>
        <h3>LinksBook Created</h3>
    </div>
    : 
    <div className={styles.linksbookAlertClosed}>
        <h3>LinksBook Created</h3>
    </div>}

            <main className={styles.links}>
                {( LinksBooks === false || LinksBooks.length === 0) ? <NoLinksBook  what="LinksBook" />
                : LinksBooks.map(linkbook => {
                    return (
                        
                            <LinksBook 
                            title={linkbook.title}
                            description={linkbook.description}
                            link={linkbook._id}
                        />
                        
                    )
                })}
            </main>
            
                <div className={styles.actions}>
                    <button onClick={() => toggleOpen()} className={styles.createnNewLinksBookButton}>
                        New LinksBook
                    </button>
                </div>
        </div>
    )       
}


export default Dashboard;
