import React, { FunctionComponent, useState, useEffect } from "react";

import { Divider } from "@geist-ui/react";

// import custom components
import DashboardHeader from "../../components/Header";

// utils
import { auth } from "../../utils/authhandler";
import { onAuthStateChanged } from "firebase/auth";

interface IuserData {
    name: string
    uid: string
}

const DashboardIndex: FunctionComponent = (): JSX.Element => {

    // const [user, setUser] = useState<IuserData>();

    /* useEffect(() => {
        const user_: any = getUser();

        if (user_ !== undefined) {
            setUser(user_);
            console.log(user);
        }
    }, []); */

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user.displayName);
            } else {
                console.log("Could not get user");
            }
        });
    }, []);

    return (
        <div>
            <DashboardHeader profileName={"Josias"} />
            <Divider />
        </div>
    )
}

export default DashboardIndex;