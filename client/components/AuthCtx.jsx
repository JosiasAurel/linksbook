import React, { createContext } from "react";

let ctxValue = {
    isAuth: false,
    setAuth: () => true
}

const AuthCtx = createContext(ctxValue);

const AuthProvider = ({ children, authenticated })

export default AuthProvider;