import React, { FunctionComponent } from "react";

const SignUpPage: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button>
                    SignUp
                </button>
            </form>
        </div>
    )
}

export default SignUpPage;