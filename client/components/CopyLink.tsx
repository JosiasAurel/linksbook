import React from "react";

import styles from "../styles/components.module.css";

interface CopyLinkProps {
    link: string
}

const CopyLink: React.FC<CopyLinkProps> = ({ link }): JSX.Element => {

    function copyToClipboard(): void {
        // copy the link to the clipboard
        navigator.clipboard.writeText(link);
    }

    return (
        <div className={styles.copyLink}>
            <p> {link} </p>
            <button onClick={e => copyToClipboard()}>
                copy
            </button>
        </div>
    )
}

export default CopyLink;