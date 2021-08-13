import React, { FunctionComponent, useState } from "react";

import { Card, Input, Spacer, Text, Button } from "@geist-ui/react";

// import custom styles
import styles from "../../styles/auth.module.css";

// import utils
import { signUser } from "../../utils/authhandler";
import { saveUser } from "../../utils/fetchers";
import { setCredentials } from "../../utils/misc";

const SignUpPage: FunctionComponent = (): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // handle input change
    const handleChange: Function = (event: any, handler: any) => handler(event.target.value);

    async function createUser(event: any) {
        event.preventDefault(); // prevent default browser behaviour

        const result = await signUser(email, password);
        console.log(result);
        saveUser(name, email, result.user.uid);
        const userToken: Promise<string> = result.user.getIdToken();
        setCredentials(name, email, await userToken);
    }
    return (
        <div className={styles.signUpPage}>
            <div className={styles.form__container}>
                <Text h2> Linksbook - SignUp </Text>
                <Card className={styles.form_card}>
                    <div className={styles.form__center}>
                        <form className={styles.signUpForm}>
                            <Input value={name} onChange={event => handleChange(event, setName)} width="90%" label="Username" placeholder="Mike" />
                            <Spacer y={1} />
                            <Input value={email} onChange={event => handleChange(event, setEmail)} width="90%" label="Email" placeholder="mik0rb0te@gmail.com" />
                            <Spacer y={1} />
                            <Input.Password value={password} onChange={event => handleChange(event, setPassword)} width="90%" label="Password" />
                            <Spacer y={1} />
                            <Button onClick={e => createUser(e)} type="secondary"> Sign Up </Button>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SignUpPage;