import React from "react";

import { Input, Button } from "vercel-style";

import { CREATE_LINK, FETCH_ALL } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface CreateLinkFormProps {
    getUpdatedData?: Function
}

const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ getUpdatedData }): JSX.Element => {

    const [url, setUrl] = React.useState<string>("");

    // the create link mutation handler
    const [saveLink, { data, loading, error }] = useMutation(CREATE_LINK);
    async function handleCreateLink(event: any): Promise<void> {
        event.preventDefault(); // prevent page reload

        toast.promise(saveLink({
            variables: { url, annotation: url, tags: ["new"] }, refetchQueries: [{ query: FETCH_ALL }]
        }).then(() => getUpdatedData(data)), { loading: "Saving", success: "Bookmark saved", error: "Could not save bookmark" });

    }

    return (
        <form onSubmit={e => handleCreateLink(e)} style={{ display: "flex" }}>
            <Input value={url} onChange={e => setUrl(e.target.value)} label="url" placeholder="https://twitter.com" />
            <Button htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateLinkForm;