import React from "react";

import styles from "../styles/components.module.css";

import { toast } from "react-hot-toast";

interface CopyLinkProps {
    link: string
}

const CopyLink: React.FC<CopyLinkProps> = ({ link }): JSX.Element => {

    function copyToClipboard(): void {
        // copy the link to the clipboard
        navigator.clipboard.writeText(link);

        toast("Link Copied", { icon: "🔗" });
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