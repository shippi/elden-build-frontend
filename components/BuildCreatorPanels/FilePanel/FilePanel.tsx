'use client'
import { AuthContext } from "@/context/AuthContext"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useEffect, useRef, useState } from "react"
import { delay } from "@/utils";
import { DropDown } from "../..";
import { useClickOutside } from "@/hooks";
import { armours, arrows, ashes, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data";
import { getItemFromName } from "@/helpers/BuildCreatorHelper";
import { crystalTears } from "@/public/data/Equipment/crystalTears";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import { FilePanelContext } from "@/context/FilePanelContext";
import NewButton from "./NewButton";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";

function FilePanel() {
  const { setSelectedClass, setSelectedArmours, setSelectedTalismans, setSelectedWeapons, setSelectedAshes, setSelectedWepLvls, setSelectedAffinities, setSelectedRune, setSelectedTears, setSelectedArrows, setSelectedBolts, 
          setSelectedSpells, setCharacterStats, isPublic, setIsPublic, loadingBuild, setLoadingBuild, saveable, setSaveable, saveId, setSaveId, setCurrentBuild, buildName, setBuildName, resetBuild, confirmationOpen, setConfirmationOpen, setConfirmationMessage, setConfirmationFunction} 
         = useContext(BuildCreatorContext);

  const { currentUser } = useContext(AuthContext);
 
  const { saveLoading, setSaveLoading, message, setMessage, isError, setIsError, oldBuildName, 
  				setOldBuildName, selectedIndex, setSelectedIndex, builds, setBuilds, selectToggle, setSelectToggle} = useContext(FilePanelContext);

  const [loadOpen, setLoadOpen] = useState(false);

  const [buildNameWidth, setBuildNameWidth] = useState("");

    
  let uid = "";
  if (currentUser) uid = currentUser.uid;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && currentUser) setBuildNameWidth(ref.current.offsetWidth + "px")
  })

  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropDownRef, () => {setLoadOpen(false)});

  useEffect(() => {
    if (currentUser && uid && (loadOpen == true || saveLoading == false)) {
      const res = async() => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${uid}`, {
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
  }, [loadOpen, saveLoading, currentUser, loadingBuild])

  useEffect(() => {
    setSelectedIndex(builds.findIndex((build) => build.id == saveId));
  }, [builds])

  useEffect(() => {
    setIsError(false);
    setMessage("");
  }, [saveLoading, loadingBuild])

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

  const handleVisibilityOnClick = () => {
    setIsPublic(!isPublic);
  }

  useEffect(() => {
    if (builds[selectedIndex]) {
      const selectedBuild = builds[selectedIndex].build
      setCharacterStats(selectedBuild.characterStats);
      setSelectedClass(getItemFromName(selectedBuild.selectedClass, classes));
      setSelectedArmours(selectedBuild.selectedArmours.map((armour: string) => getItemFromName(armour, armours)));
      setSelectedTalismans(selectedBuild.selectedTalismans.map((name: string) => getItemFromName(name, talismans)));
      setSelectedWeapons(selectedBuild.selectedWeapons.map((name: string) => getItemFromName(name, weapons)));
      setSelectedRune(getItemFromName(selectedBuild.selectedRune, greatRunes));
      setSelectedTears(selectedBuild.selectedTears.map((name: string) => getItemFromName(name, crystalTears)));
      setSelectedAshes(selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)));
      setSelectedAffinities(selectedBuild.selectedAffinities);
      setSelectedWepLvls(selectedBuild.selectedWepLvls);
      setSelectedArrows(selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)));
      setSelectedBolts(selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)));
      setSelectedSpells(selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)));
      setIsPublic(builds[selectedIndex].is_public);
      
      setCurrentBuild({
        selectedClass: getItemFromName(selectedBuild.selectedClass, classes),
        selectedArmours: selectedBuild.selectedArmours.map((armour: string) => getItemFromName(armour, armours)), 
        selectedTalismans: selectedBuild.selectedTalismans.map((name: string) => getItemFromName(name, talismans)), 
        selectedWeapons: selectedBuild.selectedWeapons.map((name: string) => getItemFromName(name, weapons)), 
        selectedAshes: selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)), 
        selectedWepLvls: selectedBuild.selectedWepLvls,
        selectedAffinities: selectedBuild.selectedAffinities, 
        selectedRune: getItemFromName(selectedBuild.selectedRune, greatRunes),
        selectedTears: selectedBuild.selectedTears.map((name: string) => getItemFromName(name, crystalTears)), 
        selectedArrows: selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)), 
        selectedBolts: selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)), 
        selectedSpells: selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)), 
        characterStats: selectedBuild.characterStats,
        isPublic: builds[selectedIndex].is_public
      });
    }
    else {
      resetBuild();
    }
    setSaveable(false);
    setTimeout(() => setLoadingBuild(false), 750);

  }, [selectToggle])



  return (
    <>
    {confirmationOpen && <ConfirmationModal/>}
    
    <div className="file-panel">
      
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
      <div >
        <label>Visibility </label>
        <div className="visibility-container">
          <i className={isPublic ? "fa fa-eye fa-lg" : "fa fa-eye-slash fa-lg" } aria-hidden="true" style={{fontSize: "32px"}} onClick={handleVisibilityOnClick}/>
        </div>
      </div>

			<NewButton />
			<SaveButton />
			<DeleteButton />
      {message && <div className="message" style={{color: isError ? "red" : " white"}}>{message}</div>}
    </div>
    </>
  )
}

export default FilePanel
