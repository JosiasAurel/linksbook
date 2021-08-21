import React, { FunctionComponent, useState, useEffect } from "react";

import { Divider } from "@geist-ui/react";

// import custom components
import DashboardHeader from "../../components/Header";

// utils
import { auth } from "../../utils/authhandler";
import { onAuthStateChanged } from "firebase/auth";

interface IuserData {
    name: string
    email: string
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    const [user, setUser] = useState<IuserData>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const name: string = localStorage.getItem("name") ?? undefined;
        const email: string = localStorage.getItem("email") ?? undefined;

        if (name !== undefined && email !== undefined) {
            setUser({ name, email });
            setLoading(false);
        } else {
            return;
        }
    }, [loading]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user.displayName);
            } else {
                console.log("Could not get user");
            }
        });
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div>
            <DashboardHeader profileName={user.name} />
            <Divider />
        </div>
    )
}

export default DashboardIndex;