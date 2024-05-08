'use client'
import { BuildCreatorContext } from "@/context/BuildCreatorContext";
import { FilePanelContext } from "@/context/FilePanelContext";
import { useContext, useEffect, useRef, useState } from "react"

function NewButton() {
	const { loadingBuild, setLoadingBuild, saveable } = useContext(BuildCreatorContext);

	const { buildName, saveLoading, setOldBuildName, setSelectedIndex, setSelectToggle, selectToggle, 
			selectedIndex, oldBuildName, setConfirmationOpen, setConfirmationMessage, 
			setConfirmationFunction } = useContext(FilePanelContext);

	const [disabled, setDisabled] = useState(true);

    const handleNew = () => {
      	const newBuild = () => {
    		setOldBuildName("");
          	setSelectedIndex(-1);
          	setLoadingBuild(true);
          	setSelectToggle(!selectToggle);
          	setConfirmationOpen(false);
        }

        if (saveable || oldBuildName != buildName) {
         	setConfirmationOpen(true);
          	setConfirmationMessage("Are you sure you want to create a new build? Unsaved changes will not be saved.");
          	setConfirmationFunction(() => newBuild);
        }
        else {
          newBuild();
        }
    }

	useEffect(() => {
		if (selectedIndex > -1 || oldBuildName != buildName || saveable) setDisabled(false);
		else setDisabled(true);
	}, [selectedIndex, buildName, saveable])
	
	return (
    	<button onClick={handleNew} className={disabled || loadingBuild || saveLoading ? "disabled" : ""}>New</button>
  	)
}

export default NewButton