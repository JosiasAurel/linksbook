import React from "react";

import styles from "../styles/components.module.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";

interface FolderProps {
    readonly type: string // Parent or Child
    readonly label: string
    thirdPartyAction?: Function
}

const Folder: React.FC<FolderProps> = ({ type, label, thirdPartyAction }): JSX.Element => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOOKMARK,
        drop: (item: any, _) => console.log(`Dropped bookmark : ${item?.id}`),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }));

    function toggleFolderSelected(): void {
        thirdPartyAction(); // execute an external action
    }

    return (
        <div ref={drop} onClick={e => toggleFolderSelected()} className={styles.folder}>
            <h2> {label} </h2>
        </div>
    )
}

export default Folder;