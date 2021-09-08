import React, { FunctionComponent } from "react";

import { useUser, UserButton } from "@clerk/nextjs";

import styles from "../styles/auth.module.css";

const User: FunctionComponent = (): JSX.Element => {
    const { firstName } = useUser();
    return (
        <div className={styles.userButton}>
            <UserButton />
            <h2> {firstName} </h2>
        </div>
    )
}

export default User;