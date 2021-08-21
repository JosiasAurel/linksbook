import React, { FunctionComponent } from "react";

import { User } from "@geist-ui/react";

import Logo from "./logo";

interface DashboardHeaderProps {
    profileName: string
}

const DashboardHeader: FunctionComponent<DashboardHeaderProps> = ({ profileName }): JSX.Element => {
    return (
        <header className="flex-row-btw">
            <Logo />
            <User src="/profile.png" name={profileName} />
        </header>
    )
}

export default DashboardHeader;