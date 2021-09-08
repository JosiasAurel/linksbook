import React from "react";

import styles from "../styles/components.module.css";

interface CopyLinkProps {
    link: string
}

const CopyLink: React.FC<CopyLinkProps> = ({ link }): JSX.Element => {
    return (
        <div className={styles.copyLink}>
            <p> {link} </p>
            <button>
                copy
            </button>
        </div>
    )
}

export default CopyLink;