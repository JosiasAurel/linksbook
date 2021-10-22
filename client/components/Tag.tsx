import React from "react";

import styles from "../styles/components.module.css";

interface TagProps {
    name: string
    searchByTag?: Function
}

const Tag: React.FC<TagProps> = ({ name, searchByTag }) => {
    return (
        <div onClick={_ => searchByTag(name)} className={styles.tag}>
            <p> {name} </p>
        </div>
    )
}

export default Tag;