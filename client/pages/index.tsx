import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import { useQuery, gql } from "@apollo/client";

import Header from "../components/Header";
import Search from "../components/Search";

import styles from "../styles/index.module.css";

const HomePage: FunctionComponent = (): JSX.Element => {
    const Hello = gql`
    query {
        hello
    }
    `;

    const { loading, error, data } = useQuery(Hello);

    console.log(data);
    return (
        <div className={styles.dashboardPage}>
            <Header />
            <div className={styles.dashboardSections}>
                <section className={styles.foldersSection}>
                    <Search searchAction={(() => undefined)} />
                </section>


                <section className={styles.linksSection}>

                </section>
            </div>
        </div>
    )
}

export default HomePage;