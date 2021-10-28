import React from "react";

import styles from "../styles/components.module.css";

import ColorToggle from "./colorToggle";
import { LogOut, Settings } from "@geist-ui/react-icons";

interface UserButtonProps {
    name: string
}

const User: React.FC<UserButtonProps> = ({ name }): JSX.Element => {

    return (
        <>
            <div className={styles.userPrefMenu}>
                <div>
                    <ColorToggle action={_ => undefined} />
                </div>
                <div>
                    <Settings />
                </div>
                <div>
                    <LogOut color="red" />
                </div>
            </div>
        </>
    )
}

export default User;