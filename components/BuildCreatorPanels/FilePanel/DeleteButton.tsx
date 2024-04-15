import { AuthContext } from "@/context/AuthContext";
import { BuildCreatorContext } from "@/context/BuildCreatorContext";
import { FilePanelContext } from "@/context/FilePanelContext";
import { delay } from "@/utils";
import { useContext } from "react";

function DeleteButton() {
	const { buildName, loadingBuild, setLoadingBuild, saveId } = useContext(BuildCreatorContext);

    const { setOldBuildName, setSelectedIndex, setSelectToggle, selectToggle, 
            selectedIndex, setIsError, setMessage, setSaveLoading, setConfirmationOpen, 
            setConfirmationMessage, setConfirmationFunction } = useContext(FilePanelContext);

    const { currentUser } = useContext(AuthContext);
    const handleDelete = async () => {
        const deleteBuild = async () => {
          try {
            setConfirmationOpen(false);
            setLoadingBuild(true);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "builds/" + saveId, 
            {
              method: "DELETE",
              headers: { 
                "Content-Type": "application/json", 
                "Authorization" : `Bearer ${currentUser.accessToken}` 
              },
              mode: "cors",
            })
            .then(res=> {if (!res.ok) throw new Error()});
            
            setOldBuildName("");
            setSelectedIndex(-1);
            setSelectToggle(!selectToggle);
          }
          catch (error) {
            setIsError(true);
            setMessage("Server error.");
            await delay(2510);
            setSelectToggle(!selectToggle);
            setSaveLoading(false);
          }
        }
    
        setConfirmationOpen(true);
        setConfirmationMessage(["Are you sure you want to delete the following build? (this action cannot be undone): ", 
                                <><br/><br/><span className="build-name">{buildName}</span></>, ""]);
        setConfirmationFunction(() => deleteBuild);
    }
    return (
        <button onClick={handleDelete} className={"delete-btn" + (selectedIndex < 0 || loadingBuild ? " disabled" : "")}><i className="fa fa-trash" aria-hidden="true" style={{fontSize: "26px"}}/></button>
    )
}

export default DeleteButton