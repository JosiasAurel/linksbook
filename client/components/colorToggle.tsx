import React from "react";

import styles from "../styles/components.module.css";

const ColorToggle: React.FC = (): JSX.Element => {

    const [rotation, setRotation] = React.useState<number>(0);

    React.useEffect(() => {
        console.log(rotation);
    }, [rotation]);

    return (
        <div onClick={_ => setRotation(rotation + 90)} className={styles.colorToggle}>
            <div style={{ transform: `rotate(${rotation}deg)` }}>
            </div>
        </div>
    )
}

export default ColorToggle;