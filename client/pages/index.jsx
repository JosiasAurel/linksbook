import React, { useEffect, useState } from "react";

import styles from "../styles/index.module.css";

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
                <button>
                    Get Me Started
                </button>
            </div>

            <span className={styles.arrowDown}>
                    <Image src="/arrow-down.svg" width="40" height="40" />
            </span>
            </section>

            <section className={styles.showers}>
                <div>
                    <h2>Get rid of your bookmarks</h2>
                    <Image src="/bookmark.svg" height="150" width="150" />
                </div>
                <div>
                    <h2>Save your links in collections</h2>
                    <Image src="/book-open.svg" height="150" width="150" />
                </div>
                <div>
                    <h2>Share your collections with the public</h2>
                    <Image src="/share.svg" height="150" width="150" />
                </div>
                <div>
                    <h2>Know your collections</h2>
                    <Image src="/map.svg" height="150" width="150" />
                </div>
            </section>

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