import React from "react";

import styles from "../styles/components.module.css";
import {
    Copy,
    Edit2,
    ArrowUpRight,
    Trash2,
    Eye,
    Clock,
} from "@geist-ui/react-icons";

import { truncateStr, handleChange } from "../utils/string";
import toast from "react-hot-toast";

interface LinkCardProps {
    readonly name: string;
    readonly url: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
    name,
    url,
}): JSX.Element => {

    function copyToClipboard(): void {
        // copy the link to the clipboard
        navigator.clipboard.writeText(url);

        toast("Copied Link to Clipboard", { icon: "🔗" });
    }

    return (
        <div className={styles.linkCard}>
            <p> {truncateStr(name, 30)} </p>

            <div className={styles.actions}>
                {/* Navigate To */}
                <a href={url} target="_blank">
                    <ArrowUpRight />
                </a>
                {/* End Navigate To */}

                {/* Copy Icon */}
                <div onClick={(e) => copyToClipboard()} className={styles.copyIcon}>
                    <Copy />
                </div>


            </div>

        </div>
    );
};

export default LinkCard;
