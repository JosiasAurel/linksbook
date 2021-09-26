import React from "react";

import { Button } from "@nextui-org/react";
import { Input, Modal } from "@geist-ui/react";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/auth.module.css";
import toast from "react-hot-toast";
import router from "next/router";
import { handleChange } from "../../utils/string";

const AUTH_SERVICE_URI: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

const LogInPage: React.FC = (): JSX.Element => {

    const [email, setEmail] = React.useState<string>("");
    const [pin, setPin] = React.useState<string>("");
    const [modal, setModal] = React.useState<boolean>(false);

    /* Handle Creating Log In Pin */
    async function handleLogIn(): Promise<void> {
        const response = await fetch(`${AUTH_SERVICE_URI}/create-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        console.log(result);
        if (result.status === "Success") {
            toast.success("Success");
            setModal(true);
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
    /* Handle Creating Log In Pin - End */

    /* Handle Getting Auth token */
    async function getCredentials(): Promise<void> {
        const response = await fetch(`${AUTH_SERVICE_URI}/complete-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, pin })
        });

        const result = await response.json();

        if (result.status === "success") {
            toast.success(result.status);
            setTimeout(() => router.replace("/"), 2000);
        } else {
            toast.error(result.status);
        }
    }

    async function authenticateWithPin(event: any): Promise<void> {
        event.preventDefault(); // prevent browser reload

        if (pin.trim() !== "" && email.trim() !== "") {
            await getCredentials();
        } else {
            toast.error("Please enter your pin or fill email");
        }
    }
    /* Handle Getting Auth token - End*/


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
            <Modal visible={modal}>
                <div className={styles.content}>
                    <Image src="/LinksBook.svg" width={150} height={150} />
                    <form onSubmit={e => authenticateWithPin(e)}>
                        <Input value={pin} onChange={e => handleChange(e, setPin)} clearable>
                            Log In Pin
                        </Input>
                        <Button htmlType="submit">
                            Log In
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default LogInPage;