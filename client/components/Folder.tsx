import React from "react";

import styles from "../styles/components.module.css";

interface FolderProps {
    type: string // Parent or Child
    label: string
}

const Folder: React.FC<FolderProps> = ({ type, label }): JSX.Element => {
    return (
        <div className={styles.folder}>
            <div className={styles.circleIcon}>

            </div>
            <h2> {label} </h2>
        </div>
    )
}

export default Folder;