import React from "react";

import { Input, Button } from "@geist-ui/react";

import { CREATE_COLLECTION } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const CreateCollectionForm: React.FC = (): JSX.Element => {

    const [url, setUrl] = React.useState<string>("");

    // the create link mutation handler
    const [saveCollection, { data, loading, error }] = useMutation(CREATE_COLLECTION);
    async function handleCreateLink(event: any): Promise<void> {
        event.preventDefault(); // prevent page reload

        toast.promise(saveCollection({ variables: { url, annotation: url, tags: [] } }), { loading: "Saving", success: "Bookmark saved", error: "Could not save bookmark" });

    }

    return (
        <form onSubmit={e => handleCreateLink(e)} style={{ display: "flex" }}>
            <Input value={url} onChange={e => setUrl(e.target.value)} label="Name" placeholder="Cat Photos" />
            <Button htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateCollectionForm;