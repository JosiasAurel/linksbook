import React from "react";

import styles from "../styles/components.module.css";

import ColorToggle from "./colorToggle";
import { LogOut, Settings } from "@geist-ui/react-icons";

interface UserButtonProps {
    name: string
    toggleSettings?: Function
}

const User: React.FC<UserButtonProps> = ({ name, toggleSettings }): JSX.Element => {

    async function logOut(): Promise<any> {

    }
    return (
        <>
            <div className={styles.userPrefMenu}>
                <div>
                    <ColorToggle action={_ => undefined} />
                </div>
                <div onClick={e_ => toggleSettings()}>
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