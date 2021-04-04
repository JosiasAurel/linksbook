import React, { useEffect } from "react";

import styles from "../styles/index.module.css";

import Image from "next/image";

import { createJWT } from "../utils/createToken";

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
        </div>
    );
}

export default Home;