'use client'
import { BuildCreatorContext } from "@/context/BuildCreatorContext";
import { FilePanelContext } from "@/context/FilePanelContext";
import { useContext, useEffect, useRef, useState } from "react"

function NewButton() {
	const { buildName, loadingBuild, setLoadingBuild, saveable, setConfirmationOpen, 
			setConfirmationMessage, setConfirmationFunction } = useContext(BuildCreatorContext);

	const { setOldBuildName, setSelectedIndex, setSelectToggle, selectToggle, 
			selectedIndex, oldBuildName } = useContext(FilePanelContext);

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
		if (selectedIndex > -1) setDisabled(false);
		else setDisabled(true);
	}, [selectedIndex])
	
	return (
    	<button onClick={handleNew} className={disabled || loadingBuild ? "disabled" : ""}>New</button>
  	)
}

export default NewButton