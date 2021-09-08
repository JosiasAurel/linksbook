import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import styles from "../styles/index.module.css";

import User from "../components/User";
import ColorToggle from "../components/colorToggle";
import Tag from "../components/Tag";
import CopyLink from "../components/CopyLink";
import Folder from "../components/Folder";

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
            <div>
                <Tag name="Hello" />
            </div>

            <div>
                <CopyLink link="https://hello.world" />
            </div>

            <div>
                <Folder type="Parent" label="Mobile" />
                <Folder type="Child" label="Mobile" />
            </div>
        </div>
    )
}

export default HomePage;