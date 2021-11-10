import React from "react";

import styles from "../styles/components.module.css";

const ColorToggle: React.FC = (): JSX.Element => {

    const [rotation, setRotation] = React.useState<number>(0);
    const themes = ["light", "dark", "image", "image_blur"];

    function handleRotation(): void {
        setRotation(rotation + 90);

        const currentTheme = localStorage.getItem("theme");

        const currentEl = themes.indexOf(currentTheme);
        localStorage.setItem("theme", currentEl !== 3 ? themes[currentEl + 1] : themes[0]);

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