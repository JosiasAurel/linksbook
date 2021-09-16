import React from "react";

import styles from "../styles/components.module.css";
import Tag from "./Tag";

import { Copy, Edit2, ArrowUpRight, Archive } from "@geist-ui/react-icons";

interface LinkCardProps {
    name: string
    url: string
    tags: Array<string>
}

const LinkCard: React.FC<LinkCardProps> = ({ name, url, tags }): JSX.Element => {
    return (
        <div className={styles.linkCard}>
            <p> {name} </p>
            <div className={styles.linkTags}>
                {tags.map(tag => {
                    return (
                        <Tag name={tag} key={tag} />
                    )
                })}
            </div>
            <div className={styles.actions}>
                {/* Navigate To */}
                <div>
                    <ArrowUpRight />
                </div>
                {/* End Navigate To */}

                {/* Copy Icon */}
                <div className={styles.copyIcon}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <g data-name="copy">
                                <rect width="24" height="24" opacity="0" />
                                <path d="M18 21h-6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3zm-6-10a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" />
                                <path d="M9.73 15H5.67A2.68 2.68 0 0 1 3 12.33V5.67A2.68 2.68 0 0 1 5.67 3h6.66A2.68 2.68 0 0 1 15 5.67V9.4h-2V5.67a.67.67 0 0 0-.67-.67H5.67a.67.67 0 0 0-.67.67v6.66a.67.67 0 0 0 .67.67h4.06z" />
                            </g>
                        </g>
                    </svg> */}
                    <Copy />
                </div>
                {/* End Copy Icon */}


                {/* Edit Icon */}
                <div className={styles.editIcon}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <g data-name="edit">
                                <rect width="24" height="24" opacity="0" />
                                <path d="M19.4 7.34L16.66 4.6A2 2 0 0 0 14 4.53l-9 9a2 2 0 0 0-.57 1.21L4 18.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 20h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71zM9.08 17.62l-3 .28.27-3L12 9.32l2.7 2.7zM16 10.68L13.32 8l1.95-2L18 8.73z" />
                            </g>
                        </g>
                    </svg> */}
                    <Edit2 />
                </div>
                {/* End Edit Icon */}

                {/* Delete Icon */}
                <div className={styles.deleteIcon}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g data-name="Layer 2">
                            <g data-name="trash-2">
                                <rect width="24" height="24" opacity="0" />
                                <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12z" />
                                <path d="M9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z" />
                                <path d="M15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v4a1 1 0 0 0 1 1z" />
                            </g>
                        </g>
                    </svg> */}
                    <Archive />
                </div>
                {/* End Delete Icon */}
            </div>
        </div>
    )
}

export default LinkCard;