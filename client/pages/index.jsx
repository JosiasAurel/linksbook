import React, { useEffect } from "react";

import styles from "../styles/index.module.css";

import Image from "next/image";
import Link from "next/link";

const Home = () => {
    return (
        <div>
            <header>
                <div></div>
            </header>
            <main >
                <div className={styles.heroIcon}>
                    <Image src="/link-2.svg" width="100" height="100" />
                </div>
            </main>

            <div>
                <h1>Homepage still at work</h1>
                <span>
                    <Link href="/login">
                        <button>LogIn</button>
                    </Link>
                    <Link href="/signup">
                        <button>SignUp</button>
                    </Link>
                    <Link href="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                </span>
            </div>
            <style jsx>{`
            div {
                text-align: center;
            }
                span {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                }
            `}</style>
        </div>
    );
}

export default Home;