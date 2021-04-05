import React, { useState } from "react";
import Link from "next/link";

const SignUp = () => {

    // form input values
    const [name_, setName_] = useState("");
    const [email_, setEmail_] = useState("");
    const [password_, setPassword_] = useState("");

    // a reusable function to handle changes on form input
    const formInputChangeHandler = (e, handler) => {
        handler((e.target.value).trim());
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        let n_ = createNewUser();
        console.log(n_);
    }

    const createNewUser = () => {
        let newUserCred = {
            name: name_,
            email: email_,
            password: password_
        }

        let newlyCreatedUser_ = [];

        fetch("http://https://linksbook-1.josiasaurel.repl.co/getlinks/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserCred)
        }).then(res => res.json())
            .then(data => {
                newlyCreatedUser_.push(data);
                localStorage.setItem("token", `${data.name} ${data.email} ${data._id}`)
            });

            return newlyCreatedUser_[0];
    } 

    return (
        <div className="signuppage">
            <form onSubmit={(event) => handleFormSubmit(event) } className="signupform" action="">
                <h2>Sign Up</h2>
                <input onChange={(e) => formInputChangeHandler(e, setName_)} value={name_} placeholder="Enter a username" type="text"/>
                <input onChange={(e) => formInputChangeHandler(e, setEmail_)} value={email_} type="email" placeholder="Enter email e.g yuki@example.com" />
                <input onChange={(e) => formInputChangeHandler(e, setPassword_)} value={password_} type="password" placeholder="Enter a password" />
                <button>
                    Sign Up
                </button>
                <span>
                    Already have an account ? <Link href="/login"> Log In </Link>
                </span>
            </form>

            <style jsx>{`
            .signuppage {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 96vh;
                font-family: monospace;
            }
            h2 {
                    font-family: monospace;
                }
            .signupform {
                max-width: 300px;
                width: 300px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                text-align: center;
                box-shadow: 0 0 4px 2px whitesmoke;
                border-radius: 6px;
                padding: 1em;
            }

            .signupform input {
                padding: 0.8em 0 0.8em 0;
                border: solid 1px grey;
                border-radius: 5px;
                margin: 1em;
                text-align: center;
                font-family: sans-serif;
                font-size: 1em;
            }
            .signupform button {
                padding: 0.8em 0.4em 0.8em 0.4em;
                border: solid transparent;
                border-radius: 5px;
                color: white;
                background-color: blue;
                margin: 0 1em 0 1em;
                transition: transform 0.2s ease-in-out;
            }

            .signupform input:focus {
                outline: none;
            }
            .signupform button {
                outline: none;
            }
            .signupform button:active {
                transform: scale(0.9);
            }
            span {
                margin-top: 1em;
            }

            span a {
                color: gray;
            }
            `}
            </style>
        </div>
    )
}

export default SignUp;