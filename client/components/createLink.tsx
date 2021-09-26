import React from "react";

import { Input, Button } from "@geist-ui/react";

import { CREATE_LINK } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const CreateLinkForm: React.FC = (): JSX.Element => {

    const [url, setUrl] = React.useState<string>("");

    // the create link mutation handler
    const [saveLink, { data, loading, error }] = useMutation(CREATE_LINK);
    async function handleCreateLink(event: any): Promise<void> {
        event.preventDefault(); // prevent page reload

        saveLink({ variables: { url, annotation: url, tags: [] } });
    }

    if (loading) {
        toast.promise(new Promise((res, rej) => { if (data) { res(data) } else { rej(error) } }), { loading: "Saving", success: "Bookmark saved", error: "Could not save bookmark" })
    }

    return (
        <form onSubmit={e => handleCreateLink(e)} style={{ display: "flex" }}>
            <Input value={url} onChange={e => setUrl(e.target.value)} label="url" placeholder="https://twitter.com" />
            <Button htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateLinkForm;