
import React, { createContext } from "react";

interface AuthCtxProps {
    children: React.ReactElement
}

const AuthProvider: React.FC<AuthCtxProps> = ({ children }): JSX.Element => {

    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");

    React.useEffect(() => {
        /* Request... Check if user is authenticated */
        /* Is token in localstorage */
        const authToken = localStorage.getItem("token") ?? undefined;
        const userName = localStorage.getItem("name") ?? undefined;

        if (authToken !== undefined && userName !== undefined) {
            setIsAuth(true);
            setName(userName);
        }
    }, []);
    const AuthCtx = createContext({ authenticated: isAuth, name });

    return (
        <div>
            <AuthCtx.Provider value={{ authenticated: isAuth, name: name }}>
                {children}
            </AuthCtx.Provider>
        </div>
    )
}

export default AuthProvider;