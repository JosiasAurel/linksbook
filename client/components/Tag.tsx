import React from "react";

import styles from "../styles/components.module.css";

import { Badge, Spacer } from "@geist-ui/react";

interface TagProps {
    name: string
    searchByTag?: Function
}

const Tag: React.FC<TagProps> = ({ name, searchByTag }) => {
    return (
        <>
            <Badge type="success" onClick={_ => searchByTag(name)}>
                {/* <div onClick={_ => searchByTag(name)} className={styles.tag}>
            <p> {name} </p>
        </div> */}
                {name}
            </Badge>
            <Spacer h={0.5} />
        </>
    )
}

export default Tag;