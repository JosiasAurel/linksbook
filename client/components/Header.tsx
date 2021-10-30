import React from "react";

import styles from "../styles/components.module.css";

import Image from "next/image";
import { Avatar, Tooltip } from "@nextui-org/react";
import User from "./User";

import { AuthCtx } from "../contexts/auth";

interface HeaderProps {
    toggleSettings?: Function
}

const Header: React.FC<HeaderProps> = ({ toggleSettings }): JSX.Element => {

    const gCtx = React.useContext(AuthCtx);

    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Image src="/LinksBook.svg" width={40} height={40} />
            </div>
            <div>
                <Tooltip position="left" text={<User toggleSettings={() => toggleSettings()} name={gCtx.name} />} trigger="click">
                    <Avatar text={gCtx.name} />
                </Tooltip>
            </div>
        </header>
    )
}

export default Header;