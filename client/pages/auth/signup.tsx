import React, { FunctionComponent } from "react";

import { Card, Input, Spacer } from "@geist-ui/react";

// import custom styles
import styles from "../../styles/auth.module.css";

const SignUpPage: FunctionComponent = (): JSX.Element => {
    return (
        <div className={styles.signUpPage}>
            <div>
                <Card>
                    <form className={styles.signUpForm}>
                        <Input width="90%" label="Username" placeholder="Mike" />
                        <Spacer y={1} />
                        <Input width="90%" label="Email" placeholder="mik0rb0te@gmail.com" />
                        <Spacer y={1} />
                        <Input.Password width="90%" label="Password" />
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default SignUpPage;