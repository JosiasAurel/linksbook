import React, { FunctionComponent, useState, useContext, useEffect } from "react";

import styles from "../styles/index.module.css";

import User from "../components/User";
import ColorToggle from "../components/colorToggle";
import Tag from "../components/Tag";
import CopyLink from "../components/CopyLink";
import Folder from "../components/Folder";
import LinkCard from "../components/LinkCard";

let sampleTags: Array<string> = ["DAO", "Crpyto", "Ethereum"];

const KitchenSinkPage: FunctionComponent = (): JSX.Element => {

    const [name, setName] = useState<string>("");
    const handleChange: Function = (event, handler) => {
        handler(event.target.value);
    }

    return (
        <div>

            <div>
                Profile
                <User profile="/josias.jpg" name="Josias" />
            </div>
            <div>
                Tag
                <Tag name="Hello" />
            </div>

            <div>
                Copy Link
                <CopyLink link="https://hello.world" />
            </div>

            <div>
                Folders
                ------
                Parent Type Folder
                <Folder type="Parent" label="Mobile" />
                Child Type Folder
                <Folder type="Child" label="Mobile" />
            </div>

            <div>
                Link Card
                <LinkCard name="The DAO of DAOs" url="https://somepost.com/dao-of-dao" tags={sampleTags} />
            </div>
        </div>
    )
}

export default KitchenSinkPage;