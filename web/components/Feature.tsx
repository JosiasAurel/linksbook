
import React from "react";

import Image from "next/image";

import { Badge } from "@geist-ui/react";

import styles from "../styles/components.module.css";

const Feature: React.FC = () => {
    return (
        <div className={styles.feature}>
            <div className={styles.featureHead}>
                <Image src="/folder.png" width={30} height={30} />
                <Badge>
                    free
                </Badge>
            </div>
            <h2 style={{ textAlign: "center" }}>Nested Collections</h2>

            <p>
                Organize your bookmarks in a way that makes sense to you.
                Linksbook enables you to organise your bookmarks into collections and nest them however you want.
            </p>
        </div>
    )
}