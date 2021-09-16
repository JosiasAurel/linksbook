import React from "react";

import styles from "../styles/components.module.css";


import { Avatar, Spacer } from "@nextui-org/react";

const Header: React.FC = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <div>
                <h1>Star</h1>
            </div>
            <div>
                <Avatar text={"Josias"} />
            </div>
        </header>
    )
}

export default Header;