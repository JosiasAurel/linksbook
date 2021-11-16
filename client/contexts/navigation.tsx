import React, { createContext } from "react";

interface NavigationCtxProps {
  children: React.ReactElement;
}

/*  
 # Navigation Ctx may contain the following information:

    - The theme type being used
    - If it is an image, the image url
    - If it is color mode, then dark or light
*/

var currentFolder;
var setinFolder;

const NavigationCtx = createContext({ inFolder: false, folder: "" });

const NavProvider: React.FC<NavigationCtxProps> = ({
  children,
}): JSX.Element => {
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
  );
};

export { NavigationCtx, currentFolder, setinFolder, NavProvider };

export default NavigationCtx;
