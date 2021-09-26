import React from "react";

import { Input, Button } from "@nextui-org/react";

const SignUpPage: React.FC = (): JSX.Element => {
    return (
        <div>
            <form>
                <Input />
                <Input />
                <Button>
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpPage;