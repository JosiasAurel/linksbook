import React, { useEffect, useState } from "react";

import styles from "../styles/index.module.css";

import LinksBook from "../components/publicLinksBook";
import LinkCard from "../components/publicLink";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

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
            <Head>
                <title>LinksBook - Home</title>
<meta name="title" content="Start free and Upgrade if needed" />
<meta name="description" content="" />


<meta property="og:type" content="website" />
<meta property="og:url" content="https://linksbook.vercel.app/" />
<meta property="og:title" content="LinksBook" />
<meta property="og:description" content="Get rid of your bookmarks and get organised" />
<meta property="og:image" content="https://i.ibb.co/kgmTdtV/tips.png" />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://linksbook.vercel.app/" />
<meta property="twitter:title" content="LinksBook" />
<meta property="twitter:description" content="Get rid of your bookmarks and get organised" />
<meta property="twitter:image" content="https://i.ibb.co/kgmTdtV/tips.png" />
            </Head>

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
            <div className={styles.ph}>
                <a href="https://www.producthunt.com/posts/linksbook?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-linksbook" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=293640&theme=light" alt="Linksbook - Get rid of your bookmarks | Product Hunt" style={{width: "250px", height: "54px"}} width="250" height="54" /></a>
            </div>
            <span className={styles.arrowDown}>
                    <Image src="/arrow-down.svg" width="40" height="40" alt="arrow-down" />
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
                        <li>Share collections to the public</li>
                    </ul>
                    <Link href="/signup">
                        <button>
                        Start Free
                        </button>
                    </Link>
                </div>

                <div>
                    <h2>Pro ($5)</h2>
                    <ul>
                        <li>Unlimited Collections</li>
                        <li>Unlimited Links per collection</li>
                        <li>Share collections to the public</li>
                    </ul>
                    <a href="https://flurly.com/m/linksbookpro">
                        <button>
                            Buy Pro
                        </button>
                    </a>
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