import React, { useState, createContext, FunctionComponent } from "react";

interface ApplicationNavigations {
    children: JSX.Element
}


const ApplicationNavigation: FunctionComponent<ApplicationNavigations> = ({ children }): JSX.Element => {

    /*  
        This is the ID of the link used to for every operation on that link 
        Also used when fetching notes associated with the link
        It is as context for masking the link ID from the user
    */
    const [currentLink, setCurrentLink] = useState<string>();

    /*
        This is the ID of the link used to for every operation on that group
        Also used when fetching links associated with the group
        It is as context for masking the group ID from the user
    */
    const [currentGroup, setCurrentGroup] = useState<string>();

    const setNavigationLink = (linkId: string) => setCurrentLink(linkId);
    const setNavigationGroup = (groupId: string) => setCurrentGroup(groupId);

    // navigation context
    const NavigationContext: React.Context<Array<any>> = createContext([
        currentLink,
        currentGroup,
        setCurrentLink,
        setNavigationGroup
    ]);

    return (
        <NavigationContext.Provider value={
            [
                currentLink,
                currentGroup,
                setCurrentLink,
                setNavigationGroup
            ]
        }>
            {children}
        </NavigationContext.Provider>
    )
}

export { ApplicationNavigation };