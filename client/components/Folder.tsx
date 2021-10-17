import React from "react";

import styles from "../styles/components.module.css";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";

import { DROP_LINK_IN_COLLECTION, FETCH_ALL } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import { Collapse } from "@geist-ui/react";
import toast from "react-hot-toast";
import { Spacer } from "@nextui-org/react";

interface FolderProps {
    readonly type?: string // Parent or Child
    readonly label: string
    readonly id: string
    thirdPartyAction?: Function
    getUpdatedData?: Function
}

const Folder: React.FC<FolderProps> = ({ id, label, thirdPartyAction, getUpdatedData }): JSX.Element => {

    const [dropLink, { data, loading, error }] = useMutation(DROP_LINK_IN_COLLECTION);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOOKMARK,
        drop: (item: any, _) => toast.promise(dropLink({ variables: { collectionId: id, linkId: item?.id }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data)), { loading: "Adding bookmark", success: `Bookmark added to ${label}`, error: "Failed" }),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }));

    return (
        <div style={{ marginTop: "4px", width: "80%" }} ref={drop} onClick={() => thirdPartyAction()}>
            <Collapse height={"20px"} width={"100%"} title={label} className={styles.folder} >
            </Collapse>
        </div>
    )
}

export default Folder;