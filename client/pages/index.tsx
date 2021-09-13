import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import Header from "../components/Header";

import styles from "../styles/index.module.css";

const HomePage: FunctionComponent = (): JSX.Element => {

    return (
        <div className={styles.dashboardPage}>
            <Header />
            <div className={styles.dashboardSections}>
                <section className={styles.foldersSection}>

                </section>

                <section className={styles.linksSection}>

                </section>
            </div>
        </div>
    )
}

export default HomePage;