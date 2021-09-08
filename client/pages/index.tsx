import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import styles from "../styles/index.module.css";

import User from "../components/User";
import ColorToggle from "../components/colorToggle";

const HomePage: FunctionComponent = (): JSX.Element => {

    const [name, setName] = useState<string>("");
    const handleChange: Function = (event, handler) => {
        handler(event.target.value);
    }

    return (
        <div>

            <div>
                <User profile="/josias.jpg" name="Josias" />
            </div>

        </div>
    )
}

export default HomePage;