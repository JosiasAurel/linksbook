import React, { useState } from "react";

import styles from "../styles/components.module.css";

import { Input, Button as GButton } from "@geist-ui/react";
import { Menu } from "@geist-ui/react-icons";
import { Tooltip, Button } from "@nextui-org/react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { handleChange } from "../utils/string";
import { DELETE_LINK, RENAME_COLLECTION } from "../graphql/actions";

import { DROP_LINK_IN_COLLECTION, FETCH_ALL, ADD_COLLECTION_CHILD, DELETE_COLLECTION } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface FolderProps {
    readonly type?: string // Parent or Child
    readonly label: string
    readonly id: string
    readonly index: number
    readonly folder: any
    // thirdPartyAction?: Function
    getUpdatedData?: Function
    setLinks?: Function
}


/* Folder Edit Options */

function RenameFolder({ collectionId, getUpdatedData }): JSX.Element {


    const [name, setName] = useState<string>("");

    const [renameCollection, { data, loading, error }] = useMutation(RENAME_COLLECTION);

    function handleRenameCollection(event: any): void {
        event.preventDefault();

        toast.promise(renameCollection({ variables: { collectionId, name }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data)), { success: "Renamed", loading: "Renaming...", error: "Could not rename folder" })
    }
    return (
        <form onSubmit={e => handleRenameCollection(e)} style={{ display: "flex" }}>
            <Input value={name} onChange={e => handleChange(e, setName)} label="name" placeholder="Sports" />
            <GButton htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</GButton>
        </form>
    )
}

function AddChild({ collectionId, getUpdatedData }): JSX.Element {


    const [name, setName] = useState<string>("");

    const [addFolderChild, { data, loading, error }] = useMutation(ADD_COLLECTION_CHILD);

    function handleAddFolderChild(event: any): void {
        event.preventDefault();

        toast.promise(addFolderChild({ variables: { collectionId, childName: name }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data)), { success: `Created ${name}`, loading: "Creating...", error: "Could not create folder" })
    }
    return (
        <form onSubmit={e => handleAddFolderChild(e)} style={{ display: "flex" }}>
            <Input value={name} onChange={e => handleChange(e, setName)} label="name" placeholder="SubFolder" />
            <GButton htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</GButton>
        </form>
    )
}



function FolerOptions({ collectionId, getUpdatedData }): JSX.Element {

    const [deleteCollection, { data, loading, error }] = useMutation(DELETE_COLLECTION);

    function handleDeleteFolder(): void {
        toast.promise(deleteCollection({ variables: { collectionId }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data)), { success: "Deleted", loading: "Deleting...", error: "Failed to delete folder" })
    }

    return (
        <Button.Group size="large" vertical>
            <Tooltip trigger="click" text={<RenameFolder getUpdatedData={getUpdatedData} collectionId={collectionId} />}>
                <Button>
                    Rename
                </Button>
            </Tooltip>

            <Tooltip trigger="click" text={<AddChild getUpdatedData={getUpdatedData} collectionId={collectionId} />}>
                <Button>
                    Add Child
                </Button>
            </Tooltip>

            <Button color="error" onClick={_ => handleDeleteFolder()}>
                Delete Folder
            </Button>
        </Button.Group>
    )
}
/* End Folder Edit Option */

const Folder: React.FC<FolderProps> = ({ id, label, getUpdatedData, index, folder, setLinks }): JSX.Element => {

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
        // thirdPartyAction();
        setLinks(folder.links, folder.parent);
    }


    return (
        <details style={{ width: "80%" }}>
            <summary style={{ width: "100%" }}>
                <div style={{ width: "100%", backgroundColor: isOver ? "aquamarine" : "white" }} ref={drop} onClick={() => handleFolderClick()} className={styles.folder}>
                    <h2 onClick={() => handleFolderClick()}> {label} </h2>
                    <Tooltip text={<FolerOptions collectionId={id} getUpdatedData={getUpdatedData} />} trigger="click" position="right">
                        <div>
                            <Menu />
                        </div>
                    </Tooltip>
                </div>
            </summary>
            <div className="folder-children">
                {folder?.children?.map((f: any, i: any) => {
                    return (
                        <Folder
                            key={i}
                            label={f.name}
                            index={i}
                            id={f.id}
                            folder={f}
                            /* thirdPartyAction={(links: any, fId: any) => thirdPartyAction(links, fId)} */
                            getUpdatedData={(data: any) => getUpdatedData(data)}
                            setLinks={(links: any, fId: any) => setLinks(links, f.id)}
                        />
                    )
                })}
            </div>
        </details>
    )
}

export default Folder;