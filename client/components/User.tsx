import React from "react";

import styles from "../styles/components.module.css";

import ColorToggle from "./colorToggle";
import { ButtonGroup } from "@geist-ui/react";

interface UserButtonProps {
    name: string
}

const User: React.FC<UserButtonProps> = ({ name }): JSX.Element => {
    const [menu, setMenu] = React.useState<boolean>(false);

    return (
        <>
            <ButtonGroup>
                <button>
                    <img src="/edit.png" alt="edit" />
                </button>
                <button>
                    <ColorToggle />
                </button>
                <button>
                    <img src="/log-out.png" alt="log-out" />
                </button>
            </ButtonGroup>
        </>
    )
}

export default User;