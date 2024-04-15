import { PropsWithChildren, createContext, useEffect, useState } from "react"

export const FilePanelContext = createContext<any>(undefined)

export const FilePanelContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [loadingBuild, setLoadingBuild] = useState(false);

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
  
    const [oldBuildName, setOldBuildName] = useState("");
    const [builds, setBuilds] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
  
    const [selectToggle, setSelectToggle] = useState(false);

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState<any>("");
    const [confirmationFunction, setConfirmationFunction] = useState(() => {});
    
    useEffect(() => {
        if (!confirmationOpen) {
            setConfirmationMessage("");
            setConfirmationFunction(() => {});
        }
    }, [confirmationOpen]);

    const value = {
        saveLoading,
        setSaveLoading,
        message,
        setMessage,
        isError,
        setIsError,
        oldBuildName,
        setOldBuildName,
        builds,
        setBuilds,
        selectedIndex,
        setSelectedIndex,
        selectToggle,
        setSelectToggle,
        confirmationOpen,
        confirmationMessage,
        confirmationFunction,
        setConfirmationOpen,
        setConfirmationMessage,
        setConfirmationFunction
    }

    return (
        <FilePanelContext.Provider value={value}>
            {children}
        </FilePanelContext.Provider> 
    )
}
