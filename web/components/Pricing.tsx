import React from "react";

import { Button, Spacer, Badge, useTheme } from "@geist-ui/react";
import { CheckInCircleFill } from '@geist-ui/react-icons'

import styles from "../styles/components.module.css";

const Pricing: React.FC = (): JSX.Element => {

    const theme = useTheme();

    return (
        <div style={{ margin: "1em" }}>
            <Badge.Anchor>
                <Badge style={{ backgroundColor: theme.palette.alert }}>
                    Free
                </Badge>
                <div className={styles.pricing}>
                    <div className={styles.pricing__header}>
                        <h1>
                            <h1> $0 </h1> /month
                        </h1>
                    </div>
                    <div className={styles.pricing__body}>
                        <ul className={styles.pricingFeatures}>
                            <li> <CheckInCircleFill /> Unlimited Bookmarks </li>
                            <li> <CheckInCircleFill /> Unlimited Collections </li>
                            <li> <CheckInCircleFill /> Tag, Search, Notes </li>
                            <li> <CheckInCircleFill /> Unlimited Collections </li>
                        </ul>
                    </div>
                    <Spacer />
                    <Spacer />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button type="success">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </Badge.Anchor>
        </div>
    )
}

export default Pricing;