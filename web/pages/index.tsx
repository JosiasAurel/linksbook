import React from "react";

import NImage from "next/image";
import Link from "next/link";

import { Image, Button } from "@geist-ui/react";

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

                    <a href="https://vajoozk816i.typeform.com/to/IAJVR4D6">
                        <Button type="success-light">
                            Request Access
                        </Button>
                    </a>
                </div>
                <Image.Browser url="app.linksbook.me" invert>
                    <Image width="600px" height="290px" src="/heroPage.PNG" />
                </Image.Browser>
            </main>
        </div>
    )
}

export default HomePage;