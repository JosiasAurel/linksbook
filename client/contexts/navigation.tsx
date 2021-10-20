
import React, { createContext } from "react";

interface NavigationCtxProps {
    children: React.ReactElement
}

var currentFolder;
var setinFolder;

const NavigationCtx = createContext({ inFolder: false, folder: "" });

const AuthProvider: React.FC<NavigationCtxProps> = ({ children }): JSX.Element => {

    const [inFolder, setInFolder] = React.useState<boolean>(false);
    const [folder, setFolder] = React.useState<string>("");

    currentFolder = () => setInFolder(true);
    setinFolder = (folderId: string) => setFolder(folderId);

    return (
        <div>
            <NavigationCtx.Provider value={{ inFolder, folder }}>
                {children}
            </NavigationCtx.Provider>
        </div>
    )
}

export { NavigationCtx, currentFolder, setinFolder };

export default NavigationCtx;