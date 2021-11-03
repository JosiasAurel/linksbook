import React from "react";

import styles from "../styles/components.module.css";
import Tag from "./Tag";

import toast from "react-hot-toast";
import { Modal, Textarea, Divider } from "@geist-ui/react";
import { Copy, Edit2, ArrowUpRight, Trash2, Eye, Clock } from "@geist-ui/react-icons";
import { Button, Spacer } from "@nextui-org/react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { truncateStr, handleChange } from "../utils/string";

import { useMutation } from "@apollo/client";
import { DELETE_LINK, FETCH_ALL, REMOVE_LINK_FROM_COLLECTION } from "../graphql/actions";

import { ItemTypes } from "../utils/constants";
import { useDrag } from "react-dnd";

interface LinkCardProps {
    readonly name: string
    readonly url: string
    readonly tags: Array<string>
    readonly id: string
    readonly linkData: any
    readonly inFolder: boolean
    readonly folderId?: string
    viewAction?: Function
    editAction?: Function
    getUpdatedData?: Function
    tagSearchHandler?: Function
}


const LinkCard: React.FC<LinkCardProps> = ({ name, url, tags, viewAction, editAction, id, getUpdatedData, inFolder, folderId, tagSearchHandler, linkData }): JSX.Element => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOOKMARK,
        item: { id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    console.log(isDragging);
    // modal state
    const [confimDeleteModal, setConfirmDeleteModal] = React.useState<boolean>(false);

    const [deleteLink, { data, loading, error }] = useMutation(DELETE_LINK);

    function handledeleteAction(): void {
        toast.promise(deleteLink({ variables: { linkId: id }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data))
            .then(_ => setConfirmDeleteModal(false)),
            { loading: "Deleting...", success: "LinkDeleted", error: "Could not delete link" });
        return;
    }

    const [removeLink, { data: data_, loading: loading_, error: error_ }] = useMutation(REMOVE_LINK_FROM_COLLECTION);

    function removeBookmarkFromFolder(): void {
        toast.promise(removeLink({ variables: { linkId: id, collectionId: folderId }, refetchQueries: [{ query: FETCH_ALL }] })
            .then(_ => getUpdatedData(data_))
            .then(_ => setConfirmDeleteModal(false)),
            { loading: "Deleting...", success: "LinkDeleted", error: "Could not delete link" });
        return;
    }

    /* Reminder settings */
    const [reminderModal, setReminderModal] = React.useState<boolean>();

    // set reminder form
    const [remindCalendar, setRemindCalendar] = React.useState(new Date());
    const [recipients, setRecipients] = React.useState<Array<string>>([]);
    function recipientsHandler(v: any): void {
        setRecipients(v.split(" "));
    }

    React.useEffect(() => {
        console.log(remindCalendar);
    }, [remindCalendar]);

    function copyToClipboard(): void {
        // copy the link to the clipboard
        navigator.clipboard.writeText(url);
        toast.success("Copied Link to Clipboard", { position: "bottom-right", icon: "🔗" });
    }

    return (
        <div style={{ opacity: isDragging ? 0.5 : 1 }} ref={drag} className={styles.linkCard}>
            <p> {truncateStr(name, 30)} </p>
            <div className={styles.linkTags}>
                {tags.map(tag => {
                    return (
                        <Tag name={tag} key={tag} searchByTag={name => tagSearchHandler(name)} />
                    )
                })}
            </div>
            <div className={styles.actions}>
                {/* Navigate To */}
                <a href={url} target="_blank">
                    <ArrowUpRight />
                </a>
                {/* End Navigate To */}

                {/* Copy Icon */}
                <div onClick={e => copyToClipboard()} className={styles.copyIcon}>
                    <Copy />
                </div>
                {/* End Copy Icon */}

                {/* View Icon */}
                <div onClick={() => viewAction()} className={styles.editIcon}>
                    <Eye />
                </div>
                {/* End View Icon */}

                {/* Edit Icon */}
                <div onClick={() => editAction()} className={styles.editIcon}>
                    <Edit2 />
                </div>
                {/* End Edit Icon */}

                {/* Reminder Icon */}
                <div onClick={_ => setReminderModal(true)}>
                    <Clock />
                </div>
                {/* End Reminder Icon */}

                {/* Delete Icon */}
                <div onClick={() => setConfirmDeleteModal(true)} className={styles.deleteIcon}>
                    <Trash2 />
                </div>
                {/* End Delete Icon */}
            </div>
            <Modal visible={confimDeleteModal} onClose={() => setConfirmDeleteModal(false)}>
                <Modal.Content>
                    <Modal.Title>
                        Do You Really Want To Delete This Bookmark ?
                    </Modal.Title>
                    <div className={styles.confirmDeleteModalStyles}>
                        <Button onClick={() => handledeleteAction()} color="error">
                            Yes, Delete
                        </Button>
                        <Spacer />

                        {inFolder ?
                            <>
                                <Button onClick={() => removeBookmarkFromFolder()} color="error">
                                    Delete from this folder only
                                </Button>
                                <Spacer />
                            </>
                            : ""}

                        <Button onClick={() => setConfirmDeleteModal(false)} color="success">
                            No, Cancel
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>

            <Modal visible={reminderModal} onClose={() => setReminderModal(false)}>
                <Modal.Title>
                    Reminders
                </Modal.Title>

                <Modal.Content>
                    <h2>Existing Reminders</h2>
                    <div>
                        reminders...
                    </div>
                    <Divider />

                    <h2>Create New Reminder</h2>
                    <div>
                        <DateTimePicker
                            value={remindCalendar}
                            onChange={setRemindCalendar}
                        />
                        <Spacer />
                        <Textarea value={recipients.join(" ")} onChange={e => handleChange(e, recipientsHandler)} width="100%" h="100px" placeholder="Enter receivers email separated by spaces. Leave blank so you're email is used" />
                        <Spacer />
                        <Button>
                            Save Reminder
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </div >
    )
}

export default LinkCard;