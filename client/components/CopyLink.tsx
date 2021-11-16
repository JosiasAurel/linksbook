import React from "react";

import styles from "../styles/components.module.css";

import { toast } from "react-hot-toast";
import { truncateStr } from "../utils/string";

interface CopyLinkProps {
  link: string;
}

const CopyLink: React.FC<CopyLinkProps> = ({ link }): JSX.Element => {
  function copyToClipboard(): void {
    // copy the link to the clipboard
    navigator.clipboard.writeText(link);

    toast("Copied Link to Clipboard", { icon: "🔗" });
  }

  return (
    <div className={styles.copyLink}>
      <p> {truncateStr(link, 40)} </p>
      <button onClick={(e) => copyToClipboard()}>copy</button>
    </div>
  );
};

export default CopyLink;
