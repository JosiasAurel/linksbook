import React, { useState } from "react";

import styles from "../styles/index.module.css";

import { handleChange } from "../utils/string";
import { UPDATE_LINK } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { Input, Textarea } from "@geist-ui/react";
import { Button, Spacer } from "@nextui-org/react"

interface UpdateLinkProps {
    title: string
    url: string
    tags: string
    note: string
    currentLink: string
    handleFormSubmit?: Function
}

const UpdateLink: React.FC<UpdateLinkProps> = ({ title, url, tags, note, handleFormSubmit, currentLink }): JSX.Element => {

    const [updateLink, { data, loading, error }] = useMutation(UPDATE_LINK);

    /* edit link modal form fields props */
    const [eTitle, setETitle] = useState<string>(title);
    const [eLink, setELink] = useState<string>(url);
    const [eTags, setETags] = useState<string>(tags);
    const [eNote, setENote] = useState<string>(note);
    /* edit link modal form fields props - end */

    /* update link handler */

    function handleUpdateLink(event: any): void {
        event.preventDefault();

        // the magic takes place here
        // below is update link mutation handler

        toast.promise(updateLink({ variables: { linkId: currentLink, annotation: eTitle, url: eLink, tags: eTags.split(" "), note: eNote } }), {
            loading: "Updating...",
            success: "Bookmark Updated",
            error: "Could not update bookmark"
        });
    }
    /* update link handler - end*/

    return (
        <form onSubmit={e => handleUpdateLink(e)} className={styles.editLinkModalForm}>
            <Input width="100%" value={eTitle} onChange={e => handleChange(e, setETitle)} placeholder="Note title/annotation" />
            <Spacer />
            <Input width="100%" value={eLink} onChange={e => handleChange(e, setELink)} placeholder="some-url.example.com" />
            <Spacer />
            <Input width="100%" value={eTags} onChange={e => handleChange(e, setETags)} placeholder="Tags separated by spaces" />
            <Spacer />
            <Textarea width="100%" h="100px" value={eNote} onChange={e => handleChange(e, setENote)} />
            <Spacer />
            <Button htmlType="submit">
                Save
            </Button>
        </form>
    )
}

export default UpdateLink;