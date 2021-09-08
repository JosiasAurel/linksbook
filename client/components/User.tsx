import React from "react";

import styles from "../styles/components.module.css";

import ColorToggle from "./colorToggle";

interface UserButtonProps {
    profile: string
    name: string
}

const User: React.FC<UserButtonProps> = ({ profile, name }): JSX.Element => {
    return (
        <>
            <button className={styles.userButton}>
                <img className={styles.profileButton} src={profile} alt={name} />
            </button>
            <div className={styles.settingsTooltip}>
                <button>
                    <img src="/edit.png" alt="edit" />
                </button>
                <button>
                    <ColorToggle />
                </button>
                <button>
                    <img src="/log-out.png" alt="log-out" />
                </button>
            </div>
        </>
    )
}

export default User;