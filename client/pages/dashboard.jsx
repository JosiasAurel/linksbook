import React, { useState, useEffect } from "react";
import styles from "../styles/dash.module.css";

import LinksBook from "../components/LinksBook";
import Image from "next/image";

const Dashboard = () => {

    // page variables
    const [LinkBooksId, setLinkBooksId] = useState([]);
    const [LinksBooks, setLinksBooks] = useState([]);
    const [User, setUser] = useState({});

    useEffect(() => {
        fetchAndSetCredentials();
        fetchLinkBooksId();
        fetchActualLinksBook();
        console.log(`Ids ${LinkBooksId}`);
        console.log(`Books ${LinksBooks}`)
        console.log(LinksBooks)

    // fetch links books Id
    function fetchLinkBooksId() {
        if (User.id !== undefined) {
            if (LinkBooksId.length === 0) {
            fetch(`http://localhost:4000/getlinksbookid/${User.id}`)
            .then(res => res.json())
            .then(data => setLinkBooksId(data) && console.log(`LkId ${data}`))
        } else {
            return
            }
        } else {
            setLinkBooksId([]);
        }
        return
    }

    // fetch links books
    function fetchActualLinksBook() {
        if (LinksBooks === []) {
            LinkBooksId.forEach(linkBookId => {
            fetch(`http://localhost:4000/getlinksbook/${linkBookId}`)
                .then(res => res.json())
                .then(data => setLinksBooks(data) && console.log(`LinkBookA ${data}`))
        })
        } else {
            setLinksBooks([{title: "It doesnt work", description: "I wanna cry"}])
        }
    }

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

        return
    }
    }, [User])

    // variables for create linksbook modal
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);

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
        event.preventDefault();
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
    }

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <span className={styles.logo}>
                    <h2>LinksBook</h2>
                    <Image src="/link-2.svg" width="20" height="20" />
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

            <h2>Here are your LinkBooks
            </h2>

            
                {LinksBooks.length === 0 ? <h3>You have no link books yet</h3> 
                : LinksBooks.map(linkbook => {
                    return (
                        <main className={styles.links}>
                        <LinksBook 
                        title={linkbook.title}
                        description={linkbook.description}
                        />
                        </main>
                    )
                })}

                <div className={styles.actions}>
                    <button onClick={() => toggleOpen()} className={styles.createnNewLinksBookButton}>
                        New LinksBook
                    </button>
                </div>
        </div>
    )
}

export default Dashboard;