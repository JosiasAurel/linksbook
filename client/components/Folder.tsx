import React from "react";

import styles from "../styles/components.module.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";

import { DROP_LINK_IN_COLLECTION, FETCH_ALL } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface FolderProps {
    readonly type?: string // Parent or Child
    readonly label: string
    readonly id: string
    readonly index: number
    readonly folder: any
    thirdPartyAction?: Function
    getUpdatedData?: Function
    setLinks?: Function
}

const Folder: React.FC<FolderProps> = ({ id, label, thirdPartyAction, getUpdatedData, index, folder, setLinks }): JSX.Element => {

    const [dropLink, { data, loading, error }] = useMutation(DROP_LINK_IN_COLLECTION);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOOKMARK,
        drop: (item: any, _) => toast.promise(dropLink({ variables: { collectionId: id, linkId: item?.id }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data)), { loading: "Adding bookmark", success: `Bookmark added to ${label}`, error: "Failed" }),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }));

    function handleFolderClick(): void {
        thirdPartyAction();
        setLinks(folder.links);
    }

    console.log("Folder Children");
    console.log(folder?.children || "NONE");
    return (
        <details style={{ width: "80%" }}>
            <summary style={{ width: "100%" }}>
                <div style={{ width: "100%", backgroundColor: isOver ? "aquamarine" : "white" }} ref={drop} onClick={() => handleFolderClick()} className={styles.folder}>
                    <h2> {label} </h2>
                </div>
            </summary>
            <div>
                {folder.children.map((f, i) => {
                    <Folder
                        key={i}
                        label={f.name}
                        index={i}
                        id={f.id}
                        folder={f}
                        thirdPartyAction={links => setLinks(links)}
                        getUpdatedData={data => getUpdatedData(data)}
                    />
                })}
            </div>
        </details>
    )
}

export default Folder;