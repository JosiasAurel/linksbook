import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/index.module.css";

const HomePage: React.FC = (): JSX.Element => {
    return (
        <div className={styles.homePage}>
            <Header />

            <article style={{ margin: "6em 3em" }}>
                <h1>About</h1>

                <div>
                    <h1>Maker;</h1>
                    <p>
                        LinksBook is made by Josias Aurel
                    </p>
                </div>
            </article>

            <Footer />
        </div >
    )
}

export default HomePage;