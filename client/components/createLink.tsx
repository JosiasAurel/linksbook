import React from "react";

import { Input, Button } from "@geist-ui/react";

const CreateLinkForm: React.FC = (): JSX.Element => {
    return (
        <form style={{ display: "flex" }}>
            <Input label="url" placeholder="https://twitter.com" />
            <Button style={{ margin: "0 5px" }} auto scale={0.8} type="success">Save</Button>
        </form>
    )
}

export default CreateLinkForm;