import React from "react";

import styles from "../styles/components.module.css";

const ColorToggle: React.FC = (): JSX.Element => {

    const [rotation, setRotation] = React.useState<number>(0);

    function handleRotation(): void {
        setRotation(rotation + 90);

        if (rotation === 360 || rotation === 0) {
            localStorage.setItem("theme", "light");
        } else if (rotation === 90) {
            localStorage.setItem("theme", "dark");
        } else if (rotation === 180) {
            localStorage.setItem("theme", "image");
        } else if (rotation === 270) {
            localStorage.setItem("theme", "image_blur");
        }
    }
    React.useEffect(() => {
        console.log(rotation);
    }, [rotation]);

    return (
        <div onClick={_ => handleRotation()} className={styles.colorToggle}>
            <div style={{ transform: `rotate(${rotation}deg)` }}>
            </div>
        </div>
    )
}

export default ColorToggle;