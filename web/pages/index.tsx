import React from "react";

import Image from "next/image";

import styles from "../styles/index.module.css";

const HomePage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Image width="70" height="70" src="/LinksBook.svg" />
                <h1>LinksBook</h1>
            </header>

            <main className={styles.content}>
                <div>

                </div>
                <img className={styles.heroPage} src="/heroPage.png" alt="heroPage" />
            </main>
        </div>
    )
}

export default HomePage;