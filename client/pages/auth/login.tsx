import React from "react";

import { Button } from "@nextui-org/react";
import { Input } from "@geist-ui/react";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/auth.module.css";
import toast from "react-hot-toast";
import router from "next/router";
import { handleChange } from "../../utils/string";

const AUTH_SERVICE_URI: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

const LogInPage: React.FC = (): JSX.Element => {

    const [email, setEmail] = React.useState<string>("");

    async function handleLogIn(): Promise<void> {
        const response = await fetch(`${AUTH_SERVICE_URI}/create-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const result = await response.json();

        if (result.status === "Success") {
            toast.success("Success");
            router.replace("/auth/finish");
        } else {
            toast.error("Something Wrong Occurred");
            toast("Please Try Again...");
        }
    }

    async function logInUser(event: any): Promise<void> {
        event.preventDefault(); // prevent broswer reload

        if (email.trim() !== "") {
            await handleLogIn();
        } else {
            toast.error("Please fill in your email");
        }
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.content}>
                <Image src="/LinksBook.svg" width={150} height={150} />
                <form onSubmit={e => logInUser(e)}>
                    <Input value={email} onChange={e => handleChange(e, setEmail)} clearable placeholder="kylee@acme.com">
                        Email
                    </Input>
                    <Button htmlType="submit">
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