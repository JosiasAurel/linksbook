import React, { useState } from "react";

// clerk dev auth
import { useUser } from "@clerk/nextjs";

const MainAppPage: React.FC = (): JSX.Element => {

    const { id, primaryEmailAddress } = useUser();
    return (
        <div>

        </div>
    )
}

export default MainAppPage;
