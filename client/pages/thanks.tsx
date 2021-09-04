import React, { FunctionComponent, useContext, useEffect } from "react";



import styles from "../styles/index.module.css";

import { NavigationContext } from "../contexts/navigation";

const ThankYouPage: FunctionComponent = (): JSX.Element => {
    const [currentLink, currentGroup, setNavigationLink, setNavigationGroup] = useContext(NavigationContext);

    useEffect(() => {
        console.log(currentLink);
    });
    return (
        <div className={styles.page}>
            <p>{currentLink}</p>
            <h1>Hooray 🎉🎉 <br /> You have been added to the list. <br /> You will be notified when you can try this. </h1>
        </div>
    )
}

export default ThankYouPage;