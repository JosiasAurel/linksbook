import React from "react";

import styles from "../styles/components.module.css";

interface RotateButtonProps {
    action: any
}

const ColorToggle: React.FC = (): JSX.Element => {

    const [rotation, setRotation] = React.useState<number>();

    const carryAction: Function = (action: any) => {
        action();

    };
    return (
        <div className={styles.colorToggle}>
            <div>

            </div>
        </div>
    )
}

export default ColorToggle;