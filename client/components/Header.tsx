import React from "react";

import styles from "../styles/components.module.css";

import User from "./User";

const Header: React.FC = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <div>
                <h1>Star</h1>
            </div>
            <User name={"Josias"} profile="/josias.jpg" />
        </header>
    )
}

export default Header;