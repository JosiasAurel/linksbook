import React from "react";

import { Input, Button } from "@geist-ui/react";

import { CREATE_COLLECTION } from "../graphql/actions";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const CreateCollectionForm: React.FC = (): JSX.Element => {

    const [name, setName] = React.useState<string>("");

    // the create link mutation handler
    const [saveCollection, { data, loading, error }] = useMutation(CREATE_COLLECTION);
    async function handleCreateLink(event: any): Promise<void> {
        event.preventDefault(); // prevent page reload

        toast.promise(saveCollection({ variables: { name, type: "Parent" } }), { loading: "Saving", success: "Folder Created", error: "Could not save Folder" });

    }

    return (
        <form onSubmit={e => handleCreateLink(e)} style={{ display: "flex" }}>
            <Input value={name} onChange={e => setName(e.target.value)} label="Name" placeholder="Cat Photos" />
            <Button htmlType="submit" style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateCollectionForm;