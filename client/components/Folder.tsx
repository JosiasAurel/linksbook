import React from "react";

import styles from "../styles/components.module.css";

interface FolderProps {
    readonly type: string // Parent or Child
    readonly label: string
    thirdPartyAction?: Function
}

const Folder: React.FC<FolderProps> = ({ type, label, thirdPartyAction }): JSX.Element => {

    if (type === "Child") {
        return (
            <div className={styles.folder}>
                <h2> {label} </h2>
            </div>
        )
    }

    function toggleFolderSelected(): void {
        thirdPartyAction(); // execute an external action
    }

    return (
        <div onClick={e => toggleFolderSelected()} className={styles.folder}>
            <h2> {label} </h2>
        </div>
    )
}

export default Folder;