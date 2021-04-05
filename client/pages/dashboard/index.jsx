import React, { useState, useEffect } from "react";
import styles from "../../styles/dash.module.css";

import LinksBook from "../../components/LinksBook";
import Image from "next/image";

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

            <main className={styles.links}>
                {( LinksBooks === false || LinksBooks.length === 0) ? <h3>You have no LinkBooks yet</h3> 
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

export async function getServerSideProps() {
    const sampleLinksBooks = [
        {
            title: "YOlo",
            description: "Absolutely nothing"
        },
        {
            title: "YOlo",
            description: "Absolutely nothing"
        },
        {
            title: "YOlo",
            description: "Absolutely nothing"
        },
        {
            title: "YOlo",
            description: "Absolutely nothing"
        }
    ]
    return {
        props: {
            sampleLinksBooks
        }
    }
}

export default Dashboard;