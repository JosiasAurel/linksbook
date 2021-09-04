import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import styles from "../styles/index.module.css";

import { useUser, UserButton } from "@clerk/nextjs";

const HomePage: FunctionComponent = (): JSX.Element => {

    const [name, setName] = useState<string>("");
    const handleChange: Function = (event, handler) => {
        handler(event.target.value);
    }
    const { firstName } = useUser();

    return (
        <div>

            <div>
                <p>Name : {firstName} </p>
                <UserButton />
            </div>

        </div>
    )
}

export default HomePage;