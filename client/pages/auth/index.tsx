import React from "react";

import { Button } from "@nextui-org/react";
import { Input } from "vercel-style";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/auth.module.css";
import toast from "react-hot-toast";
import router from "next/router";
import { handleChange } from "../../utils/string";

const AUTH_SERVICE_URI: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

const MainAuthPage: React.FC = (): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  //console.log(AUTH_SERVICE_URI);

  function handleRegistration(): void {
    fetch(`${AUTH_SERVICE_URI}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "Success") {
          toast.success("Success");
          // redirect to login page
          toast.success("Redirecting you to login page in a bit...");
          setTimeout(() => {
            router.replace("/auth/login");
          }, 2000);
        } else {
          toast.error("Something Wrong Occurred");
        }
      });
  }

  function registerUser(event: any): void {
    event.preventDefault(); // prevent browser reload

    if (name.trim() !== "" && email.trim() !== "") {
      handleRegistration();
    } else {
      toast.error("Please fill name and email");
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.content}>
        <Image src="/LinksBook.svg" width={150} height={150} />
        <form onSubmit={(e) => registerUser(e)}>
          <Input
            value={name}
            onChange={(e) => handleChange(e, setName)}
            clearable
            placeholder="Kylee"
          >
            User Name
          </Input>
          <Input
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            clearable
            placeholder="kylee@acme.com"
          >
            Email
          </Input>
          <Button htmlType="submit">Sign Up</Button>
        </form>
        <div className={styles.option}>
          Already have an account ?
          <Link href="/auth/login">
            <p className={styles.loginOption}>Log In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainAuthPage;
