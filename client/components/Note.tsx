import React from "react";

import styles from "../styles/components.module.css";

interface NoteProps {
  note: string;
}

const Note: React.FC<NoteProps> = ({ note }): JSX.Element => {
  return <div className={styles.noteCard}>{note}</div>;
};

export default Note;
