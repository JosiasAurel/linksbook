import React, { FunctionComponent } from "react";

const HomePage: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <header>
                <button>
                    SignUp
                </button>
                <button>
                    LogIn
                </button>
            </header>
            <h1>Hello World</h1>
        </div>
    )
}

export default HomePage;