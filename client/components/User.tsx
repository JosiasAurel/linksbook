import React from "react";

import styles from "../styles/components.module.css";

import ColorToggle from "./colorToggle";
import { LogOut, Settings } from "@geist-ui/react-icons";

const AUTH_SERVICE: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

interface UserButtonProps {
  name: string;
  toggleSettings?: Function;
}

const User: React.FC<UserButtonProps> = ({
  name,
  toggleSettings,
}): JSX.Element => {
  async function logOut(): Promise<any> {
    await fetch(`${AUTH_SERVICE}/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ action: "LogOut" }),
    });
    // remove auth token
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className={styles.userPrefMenu}>
        <div>
          <ColorToggle />
        </div>
        <div onClick={(e_) => toggleSettings()}>
          <Settings />
        </div>
        <div onClick={(_) => logOut()}>
          <LogOut color="red" />
        </div>
      </div>
    </>
  );
};

export default User;
