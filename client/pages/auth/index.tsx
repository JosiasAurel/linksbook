import React from "react";

import { Button } from "@nextui-org/react";
import { Input } from "@geist-ui/react";
const MainAuthPage: React.FC = (): JSX.Element => {
    return (
        <div>
            <form>
                <Input clearable placeholder="Kylee">
                    Name
                </Input>
                <Input clearable placeholder="kylee@acme.com">
                    Email
                </Input>
                <Button>
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default MainAuthPage;