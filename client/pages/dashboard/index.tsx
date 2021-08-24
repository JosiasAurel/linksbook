import React, { FunctionComponent, useState, useEffect } from "react";

import { Divider, Modal, Input } from "@geist-ui/react";

// import custom components
import DashboardHeader from "../../components/Header";

// utils
import { auth } from "../../utils/authhandler";
import { onAuthStateChanged } from "firebase/auth";
import { createCollection, deleteCollection, fetchAllCollection } from "../../utils/fetchers";

interface IuserData {
    name: string
    email: string
    accessToken: string
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    const [user, setUser] = useState<IuserData>();
    const [userId, setUserId] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    const [createModal, setCreatedModal] = useState<boolean>(false);

    // create modal form elements
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const name: string = localStorage.getItem("name") ?? undefined;
        const email: string = localStorage.getItem("email") ?? undefined;
        const accessToken: string = localStorage.getItem("accessToken") ?? undefined;

        if (name !== undefined && email !== undefined && accessToken !== undefined) {
            setUser({ name, email, accessToken });
            setLoading(false);
        } else {
            return;
        }

        onAuthStateChanged(auth, user => {
            if (user) {
                setUserId(user.uid);
            } else {
                alert("Not Authenticated");
            }
        });
    }, [loading]);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    // handle input changes
    const handleChange: Function = (event: any, handler: any): any => handler(event.target.value);

    async function handleCreateCollection(event: any) {
        event.preventDefault(); // prevent reloading of page

        const createResult = await createCollection(userId, title, description);
        console.log(createResult);
    }

    return (
        <div>
            <DashboardHeader profileName={user.name} />
            <Divider />
            <button onClick={() => setCreatedModal(!createModal)}>Create</button>

            <Modal open={createModal}>
                <Modal.Content>
                    <form onSubmit={e => handleCreateCollection(e)}>
                        <input value={title} onChange={e => handleChange(e, setTitle)} type="text" placeholder="Collection Name" />
                        <input value={description} onChange={e => handleChange(e, setDescription)} type="text" placeholder="Description" />
                        <button>
                            Create
                        </button>
                    </form>
                </Modal.Content>
                <Modal.Action passive onClick={() => setCreatedModal(false)}>
                    Close
                </Modal.Action>
            </Modal>
        </div>
    )
}

export default DashboardIndex;