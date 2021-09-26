import React from "react";

import styles from "../styles/components.module.css";

import Image from "next/image";
import { Avatar } from "@nextui-org/react";

import { AuthCtx } from "../contexts/auth";

const Header: React.FC = (): JSX.Element => {

    const gCtx = React.useContext(AuthCtx);

    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Image src="/LinksBook.svg" width={40} height={40} />
            </div>
            <div>
                <Avatar text={gCtx.name} />
            </div>
        </header>
    )
}

export default Header;