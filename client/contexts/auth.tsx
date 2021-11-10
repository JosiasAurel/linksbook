
import React, { createContext } from "react";

const AUTH_SERVICE_URI: string = process.env.NEXT_PUBLIC_AUTH_SERVICE;

interface AuthCtxProps {
    children: React.ReactElement
}

const AuthCtx = createContext({ authenticated: false, name: "", themeType: "", theme: "", themeBlur: 0 });

const AuthProvider: React.FC<AuthCtxProps> = ({ children }): JSX.Element => {

    const [isAuth, setIsAuth] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [themeType, setThemeType] = React.useState<string>("");
    const [themeData, setThemeData] = React.useState<string>("");
    const [themeBlur, setThemeBlur] = React.useState<number>(0);

    React.useEffect(() => {
        /* Request... Check if user is authenticated */
        /* Is token in localstorage */
        const authToken = localStorage.getItem("token") ?? undefined;

        fetch(`${AUTH_SERVICE_URI}/is-authenticated`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: authToken })
        })
            .then(res => res.json())
            .then(data => {
                if (authToken !== undefined && data.status !== "Failed") {
                    setIsAuth(true);
                    setName(data.userName);
                    setThemeType(data.themeType);
                    setThemeData(data.theme);
                    setThemeBlur(data.blur);

                }
                /* console.log("Auth Data");
                console.log(data); */
            });
    }, []);

    return (
        <div>
            <AuthCtx.Provider value={{ authenticated: isAuth, name: name, themeType: themeType, theme: themeData, themeBlur: themeBlur }}>
                {children}
            </AuthCtx.Provider>
        </div>
    )
}

export { AuthCtx };

export default AuthProvider;