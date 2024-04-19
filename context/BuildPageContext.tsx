import { PropsWithChildren, createContext, useState } from "react";

export const BuildPageContext = createContext<any>(undefined)

export const BuildPageContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [build, setBuild] = useState();
    const [twoHanded, setTwoHanded] = useState(false);
    const [runeActivated, setRuneActivated] = useState(false);
    const [physickActivated, setPhysickActivated] = useState(false);

    const value = {
        build,
        setBuild
    }

    return (
        <BuildPageContext.Provider value={value}>
            {children}
        </BuildPageContext.Provider> 
    )
}