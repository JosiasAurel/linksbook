import React from "react";

import { Button } from "@nextui-org/react";
import { Input } from "@geist-ui/react";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/auth.module.css";

const LogInPage: React.FC = (): JSX.Element => {

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    function handleChange(event, handler): void {
        handler(event.target.value);
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.content}>
                <Image src="/LinksBook.svg" width={150} height={150} />
                <form>
                    <Input value={email} onChange={e => handleChange(e, setEmail)} clearable placeholder="kylee@acme.com">
                        Email
                    </Input>
                    <Button>
                        Log In
                    </Button>
                </form>
                <div className={styles.option}>
                    Don't yet have an account ?
                    <Link href="/auth">
                        <p className={styles.loginOption}>Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogInPage;