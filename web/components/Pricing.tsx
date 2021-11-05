import React from "react";

import { Button, Spacer, Badge, useTheme } from "@geist-ui/react";
import { CheckCircle } from '@geist-ui/react-icons'

import styles from "../styles/components.module.css";

interface PricingProps {
    price: number;
    features: Array<string>;
    callToAction: string;
}

const Pricing: React.FC<PricingProps> = ({ price, features, callToAction }): JSX.Element => {

    const theme = useTheme();

    return (
        <div style={{ margin: "1em" }}>
            <Badge.Anchor>
                <Badge style={{ backgroundColor: theme.palette.alert }}>
                    {price === 0 ? "Free" : "Pro"}
                </Badge>

                <div className={styles.pricing}>
                    <div className={styles.pricing__header}>
                        <h1>
                            <h1> ${price} </h1> /month
                        </h1>
                    </div>
                    <div className={styles.pricing__body}>
                        <ul className={styles.pricingFeatures}>
                            {features.map((feature, index) => {
                                return (
                                    <>
                                        <li style={{ display: "flex", flexDirection: "row" }} key={index} >
                                            <CheckCircle />
                                            <Spacer />
                                            {feature}
                                        </li>
                                        <Spacer />
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                    <Spacer />

                    <div style={{ position: "relative", top: "-25px" }}>
                        <a href="https://vajoozk816i.typeform.com/to/IAJVR4D6" target="_blank">
                            <Button type="success">
                                {callToAction}
                            </Button>
                        </a>
                    </div>
                </div>
            </Badge.Anchor >
        </div >
    )
}

export default Pricing;