import React from "react";

import styles from "../styles/components.module.css";

interface LinkCardProps {
    name: string
    url: string
}

const LinkCard: React.FC<LinkCardProps> = ({ name, url }): JSX.Element => {
    return (
        <div className={styles.linkCard}>
            <p> {name} </p>
            <div>

            </div>
        </div>
    )
}

export default LinkCard;