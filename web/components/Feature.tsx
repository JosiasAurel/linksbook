
import React from "react";

import Image from "next/image";

import { Badge } from "@geist-ui/react";

import styles from "../styles/components.module.css";

interface FeatureProps {
    title: string;
    content: string;
    icon: string;
    badge: string;
}
const Feature: React.FC<FeatureProps> = ({ title, content, icon, badge }): JSX.Element => {
    return (
        <div className={styles.feature}>
            <div className={styles.featureHead}>
                <Image src={`/${icon}`} width={30} height={30} />
                <Badge type="success">
                    {badge}
                </Badge>
            </div>
            <h2 style={{ textAlign: "center" }}>{title}</h2>

            <p>
                {content}
            </p>
        </div>
    )
}

export default Feature;