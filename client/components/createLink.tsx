import React from "react";

import { Input, Button } from "@geist-ui/react";

import { CREATE_LINK } from "../graphql/actions";
import { useMutation } from "@apollo/client";

const CreateLinkForm: React.FC = (): JSX.Element => {

    const [url, setUrl] = React.useState<string>("");
    const [button, setButton] = React.useState<any>();

    // the create link mutation handler
    const [saveLink, { data, loading, error }] = useMutation(CREATE_LINK);
    async function handleCreateLink(event: any): Promise<void> {
        event.preventDefault(); // prevent page reload

        saveLink({ variables: { url, annotation: url, tags: [] } });
    }

    return (
        <form style={{ display: "flex" }}>
            <Input value={url} onChange={e => setUrl(e.target.value)} label="url" placeholder="https://twitter.com" />
            <Button style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateLinkForm;