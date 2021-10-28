import React from "react";

import styles from "../styles/components.module.css";

interface RotateButtonProps {
    action: any
}

const ColorToggle: React.FC<RotateButtonProps> = ({ action }): JSX.Element => {

    const [rotation, setRotation] = React.useState<number>(0);

    const carryAction: Function = () => {
        setRotation(rotation + 90);
        action();

    };
    return (
        <div onClick={_ => carryAction()} className={styles.colorToggle}>
            <div style={{ transform: `rotate(${rotation}deg)` }}>

            </div>
        </div>
    )
}

export default ColorToggle;