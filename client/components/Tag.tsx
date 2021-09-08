import React from "react";

import styles from "../styles/components.module.css";

interface TagProps {
    name: string
}

const Tag: React.FC<TagProps> = ({ name }) => {
    return (
        <div className={styles.tag}>
            <p> {name} </p>
        </div>
    )
}

export default Tag;