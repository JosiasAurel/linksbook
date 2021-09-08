import { useUser, UserButton } from "@clerk/clerk-react";
import React, { useEffect } from "react";

import styles from "../styles/auth.module.css";

// complete account handler
import { completeAccountCreation } from "../utils/account";

// handler for completing user registration
const CompleteAccountPage: React.FC = (): JSX.Element => {
    const { firstName, lastName, id, primaryEmailAddress } = useUser();
    const userName = firstName + " " + lastName;

    async function completeAccountCreation(name, email, userId): Promise<void> {
        console.log(name, email, userId)
        const reqBody = { name, email, userId };
        const fetchRes = await fetch(`http://localhost:5000/complete-account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });

        const result = await fetchRes.json();

        console.log(result);
    }


    useEffect(() => {
        completeAccountCreation(userName, primaryEmailAddress.emailAddress, id);
    }, []);
    return (
        <div className={styles.completeAccountPage}>
            <main>
                <UserButton />
                <h1> Hey, {firstName} {lastName} </h1>
            </main>

            <div>
                <h2>Completing Account...</h2>
                <p>Please wait. You will be automatically redirected once done.</p>
            </div>
        </div>
    )
}

export default CompleteAccountPage;