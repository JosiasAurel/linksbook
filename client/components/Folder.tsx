import React from "react";

import styles from "../styles/components.module.css";

interface FolderProps {
    type: string // Parent or Child
    label: string
    thirdPartyAction?: Function
}

const Folder: React.FC<FolderProps> = ({ type, label, thirdPartyAction }): JSX.Element => {

    // has the folder been clicked to drop down ?
    const [selected, setSelected] = React.useState<boolean>(false);

    if (type === "Child") {
        return (
            <div className={styles.folder}>
                <div className={styles.lineIcon}>

                </div>
                <h2> {label} </h2>
            </div>
        )
    }

    // toggle is folder selected
    function toggleFolderSelected(): void {
        setSelected(!selected);
        if (thirdPartyAction) {
            thirdPartyAction();
        } else {
            return;
        }

        return;
    }

    return (
        <div onClick={e => toggleFolderSelected()} className={styles.folder}>
            <div className={!selected ? styles.circleIcon : styles.circleIconFill}>

            </div>
            <h2> {label} </h2>
        </div>
    )
}

export default Folder;