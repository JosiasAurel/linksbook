import React from "react";

import NImage from "next/image";
import Link from "next/link";

import { Image } from "@geist-ui/react";

import styles from "../styles/index.module.css";

const HomePage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div>
                    <NImage width="70" height="70" src="/LinksBook.svg" />
                    <h1>LinksBook</h1>
                </div>
                <div className={styles.navLinks}>
                    <Link href="/features">
                        <p>Features</p>
                    </Link>
                    <Link href="/pricing">
                        <p>Pricing</p>
                    </Link>
                    <Link href="/about">
                        <p>About</p>
                    </Link>
                </div>
            </header>

            <main className={styles.content}>
                <div className={styles.announcement}>
                    <h1>
                        Launching Soon 🙌
                    </h1>
                </div>
                <Image.Browser url="app.linksbook.me">
                    <Image width="50vw" height="60vh" src="/heroPage.png" />
                </Image.Browser>
            </main>
        </div>
    )
}

export default HomePage;