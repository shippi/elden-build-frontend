'use client'

import { DropDown } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { BuildCreatorContext } from "@/context/BuildCreatorContext";
import { FilePanelContext } from "@/context/FilePanelContext";
import { useClickOutside } from "@/hooks";
import { delay } from "@/utils";
import { useRef, useEffect, useContext, useState } from "react";

function BuildNameInput() {
    const { buildName, setBuildName, setSaveId, saveable, loadingBuild, setLoadingBuild } = useContext(BuildCreatorContext);
    const { currentUser } = useContext(AuthContext);
    const { message, saveLoading, builds, oldBuildName, selectedIndex, selectToggle, 
            setSelectedIndex, setOldBuildName, setSelectToggle, setConfirmationOpen, 
            setConfirmationMessage, setConfirmationFunction, setBuilds, setSaveLoading, 
            setIsError, setMessage } = useContext(FilePanelContext);

    const [buildNameWidth, setBuildNameWidth] = useState("");
    const [loadOpen, setLoadOpen] = useState(false);
    
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (ref.current && currentUser) setBuildNameWidth(ref.current.offsetWidth + "px")
    })
  
    const dropDownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropDownRef, () => {setLoadOpen(false)});

    const onDropDownSelect = (newIndex: number) => {
        const changeBuild = () => {
          setSelectedIndex(newIndex);
          setBuildName(builds[newIndex].name);
          setOldBuildName(builds[newIndex].name);
          setSaveId(builds[newIndex].id);
          setLoadOpen(false);
          setLoadingBuild(true);
          setSelectToggle(!selectToggle);
          setConfirmationOpen(false);
        }
        if (saveable || oldBuildName != buildName) {
          setConfirmationOpen(true);
          setConfirmationMessage("Are you sure you want to select a different build? Unsaved changes will not be saved.");
          setConfirmationFunction(() => changeBuild);
        }
        else {
          changeBuild();
        }
    }
    
    const handleLoad = async () => {
        if (!currentUser) {
          setSaveLoading(true);
          await delay(1);
          setIsError(true);
          setMessage("You must be logged in to view your builds.");
          
          await delay(2510);
          setSaveLoading(false);
          setMessage("");
          return;
        }
        setLoadOpen(!loadOpen);
    }

    useEffect(() => {
        if (currentUser && currentUser.uid) {
          const res = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${currentUser.uid}`, {
              method: "GET",
              headers: {
                "Authorization" : `Bearer ${currentUser.accessToken}` 
              }
            })
            .then(async res => await res.json())
            .then(data => setBuilds(data.sort((a: any, b: any) => a.name.localeCompare(b.name))))
          }
          res();
        }
    }, [loadOpen, saveLoading, currentUser, loadingBuild]);

    return (
        <div>
        <label>Build Name </label>
        <div className="input-container" ref={ref}>
          <input type="text" style={{marginTop: "5px"}} value={buildName} onChange={e => setBuildName(e.target.value)}/>
          <div className="load-container">
            {
              loadOpen ? 
              <div className="dummy-button"><i className="fa fa-angle-down rotate" aria-hidden="true"/></div>
              :
              <button onClick={handleLoad} className={message || loadingBuild || saveLoading ? "disabled" : ""}><i className={(!loadOpen ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"/></button>
            }
          </div>
        </div>
        
        {loadOpen && <div ref={dropDownRef} style={{transform: "translateY(5px)"}}><DropDown items={builds} index={selectedIndex} isNullable={false} hasImages={false} showSelected={false} width={buildNameWidth} onChange={onDropDownSelect} /></div>}
        
      </div>
    )
}

export default BuildNameInput