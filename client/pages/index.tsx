import React, { FunctionComponent, useState } from "react";

import styles from "../styles/index.module.css";

const HomePage: FunctionComponent = (): JSX.Element => {

    const [email, setEmail] = useState<string>("");

    const handleChange: Function = (event, handler) => handler(event.target.value);

    const handleFormSubmit: Function = async event => {
        event.preventDefault(); // prevent reload

        const body = { email };

        const requestPost = await fetch("/api/early", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const result = await requestPost.json();

        console.log(result);
    }
    return (
        <div className={styles.homePage}>
            <div>
                <header className={styles.header}>
                    <h1>LinksBook</h1>
                </header>
            </div>

            <main className={styles.main}>
                <h2>Making bookmarks more innovative and fun to use.</h2>
            </main>
            <div className={styles.earyForm}>
                <h3>Become an early bird</h3>
                <div className={styles.formContainer}>
                    <form onSubmit={event => handleFormSubmit(event)}>
                        <input value={email} onChange={event => handleChange(event, setEmail)} type="email" placeholder="Enter your email" />
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g data-name="Layer 2">
                                    <g data-name="arrow-forward">
                                        <rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0" />
                                        <path d="M5 13h11.86l-3.63 4.36a1 1 0 0 0 1.54 1.28l5-6a1.19 1.19 0 0 0 .09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1.19 1.19 0 0 0-.09-.15l-5-6A1 1 0 0 0 14 5a1 1 0 0 0-.64.23 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2z" />
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <footer className={styles.footer}>
                <h2>Built by <a href="https://josiasw.dev">Josias Aurel</a> </h2>
                <a href="mailto:hey@linksbook.me">hey@linksbook.me</a>
            </footer>
        </div>
    )
}

export default HomePage;