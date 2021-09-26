import React from "react";

import { Button } from "@nextui-org/react";
import { Input } from "@geist-ui/react";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/auth.module.css";
import toast from "react-hot-toast";
import router from "next/router";

const AUTH_SERVICE_URI: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

const MainAuthPage: React.FC = (): JSX.Element => {

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");

    function handleChange(event, handler): void {
        handler(event.target.value);
    }

    function handleRegistration(): void {
        fetch(AUTH_SERVICE_URI)
            .then(res => res.json())
            .then(result => {
                if (result.status === "Success") {
                    toast.success("Success");
                    // redirect to login page
                    router.replace("/auth/login");
                } else {
                    toast.error("Something Wrong Occurred");
                }
            });
    }

    return (
        <div className={styles.authPage}>
            <div className={styles.content}>
                <Image src="/LinksBook.svg" width={150} height={150} />
                <form>
                    <Input value={name} onChange={e => handleChange(e, setName)} clearable placeholder="Kylee">
                        Name
                    </Input>
                    <Input value={email} onChange={e => handleChange(e, setEmail)} clearable placeholder="kylee@acme.com">
                        Email
                    </Input>
                    <Button>
                        Sign Up
                    </Button>
                </form>
                <div className={styles.option}>
                    Already have an account ?
                    <Link href="/auth/login">
                        <p className={styles.loginOption}>Log In</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainAuthPage;