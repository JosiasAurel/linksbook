import React from "react";

import styles from "../styles/components.module.css";

import Image from "next/image";
import { Avatar, Tooltip } from "@nextui-org/react";
import User from "./User";

// import { AuthCtx } from "../contexts/auth";

interface HeaderProps {
  name: string;
  toggleSettings?: Function;
}

const Header: React.FC<HeaderProps> = ({
  name,
  toggleSettings,
}): JSX.Element => {
  // const gCtx = React.useContext(AuthCtx);

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Image src="/LinksBook.svg" width={40} height={40} />
      </div>
      <div>
        <Tooltip
          position="left"
          text={<User toggleSettings={() => toggleSettings()} name={name} />}
          trigger="click"
        >
          <Avatar text={name} />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
