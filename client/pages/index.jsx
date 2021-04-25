import React, { useEffect, useState } from "react";

import styles from "../styles/index.module.css";

import LinksBook from "../components/publicLinksBook";
import LinkCard from "../components/publicLink";

import Image from "next/image";
import Link from "next/link";

const Home = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenuOpen() {
        if (menuOpen) {
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
        }
    }


    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h2>LinksBook</h2>
                <div className={styles.headerOptions}>
                    <Link href="/signup">
                        <p>SignUp</p>
                    </Link>
                    <Link href="/login">
                        <p>LogIn</p>
                    </Link>
                    <Link href="/dashboard">
                        <p>Dashboard</p>
                    </Link>
                </div>
                <div onClick={() => toggleMenuOpen()} className={styles.menus}>
                    <div className={styles.menu}></div>
                    <div className={styles.menu1}></div>
                    <div className={styles.menu2}></div>
                </div>
            </header>
            <section className={styles.pageTop}>
                <div className={styles.menuModalContainer}>
                {menuOpen ? 
                <div className={styles.menuModal}>
                <Link href="/signup">
                    <p>SignUp</p>
                </Link>
                <Link href="/login">
                    <p>LogIn</p>
                </Link>
                <Link href="/dashboard">
                    <p>Dashboard</p>
                </Link>
            </div>
            :
            <div className={styles.menuModalClosed}>
                <Link href="/signup">
                    <p>SignUp</p>
                </Link>
                <Link href="/login">
                    <p>LogIn</p>
                </Link>
                <Link href="/dashboard">
                    <p>Dashboard</p>
                </Link>
            </div>}
            </div>
            <main className={styles.heroMain}>
                <article className={styles.copy}>
                    <p>Get rid of your bookmarks and get organised.</p>
                </article>
            </main>

            <div className={styles.start}>
                <Link href="/signup">
                    <button>
                        Get Me Started
                    </button>
                </Link>
            </div>

            <span className={styles.arrowDown}>
                    <Image src="/arrow-down.svg" width="40" height="40" />
            </span>
            </section>

            <section className={styles.showers}>
                <div className={styles.shower1}>
                    <h3>Save your bookmarks in collections.</h3>
                    <div className={styles.rotatedLinksBooksCards}>
                        <LinksBook title="Must read books of the year" description="All the best selling books i want to read" />
                        <LinksBook title="Resources" description="Simplified explanations to Calculus" />
                    </div>
                </div>

                <div className={styles.shower2}>
                    <h3>Your links more detailed</h3>
                    <div>
                        <LinkCard title="Albert Einstein" description="Albert Einstein's biography" link="https://en.wikipedia.org/wiki/Albert_Einstein" />
                        <LinkCard title="Cat Photos" description="Awesome cat photos 😍" link="https://www.pexels.com/search/cat/" />
                    </div>
                </div>
            </section>

<div className={styles.hey}>
    <h1>Start free and Upgrade if needed</h1>
</div>

            <section className={styles.pricing}>
                <div>
                    <h2>Free</h2>
                    <ul>
                        <li>6 LinkBooks/Collections</li>
                        <li>10 Links per collection</li>
                    </ul>
                    <button>
                        Coming Soon...
                    </button>
                </div>

                <div>
                    <h2>Pro</h2>
                    <ul>
                        <li>Unlimited LinkBooks/Collections</li>
                        <li>Unlimited Links per collection</li>
                        <li>Share collections to the public</li>
                    </ul>
                    <button>
                        Coming Soon...
                    </button>
                </div>
            </section>

            <section className={styles.contact}>
                    <h2>LinksBook</h2>
                    <a href="mailto:linksbook00@gmail.com">linksbook00@gmail.com</a>
            </section>

            <footer className={styles.footer}>
                <p>Made by <a href="https://josiasaurel.tech">Josias Aurel</a></p>
            </footer>
        </div>
    );
}

export default Home;