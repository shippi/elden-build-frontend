'use client'
import { AuthContext } from "@/context/AuthContext"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useEffect, useRef, useState } from "react"
import { Ammo, Armour, Ash, Spell, Talisman, Weapon } from "@/helpers/types";
import { delay } from "@/utils";
import { checkNameExists } from "@/helpers/FileHelper";
import { DropDown } from "..";
import { useClickOutside } from "@/hooks";
import { armours, arrows, ashes, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data";
import { getItemFromName } from "@/helpers/BuildCreatorHelper";

function FilePanel() {
  const { selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, selectedWepLvls, selectedAffinities, selectedRune, selectedArrows, selectedBolts, selectedSpells, characterStats,
          setSelectedClass, setSelectedArmours, setSelectedTalismans, setSelectedWeapons, setSelectedAshes, setSelectedWepLvls, setSelectedAffinities, setSelectedRune, setSelectedArrows, setSelectedBolts, 
          setSelectedSpells, setCharacterStats, loadingBuild, setLoadingBuild, saveable, setSaveable, saveId, setSaveId, setCurrentBuild, buildName, setBuildName, resetBuild, currentBuild } 
         = useContext(BuildCreatorContext);


  const {currentUser} = useContext(AuthContext);
 
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [disabledNew, setDisableNew] = useState(true);

  const [oldBuildName, setOldBuildName] = useState(buildName);
  const [builds, setBuilds] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
        await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${uid}`)
        .then(async res => await res.json())
        .then(data => setBuilds(data.sort((a: any, b: any) => a.name.localeCompare(b.name))))
      }
      res();
    }
  }, [loadOpen, saveLoading, currentUser])

  useEffect(() => {
    setSelectedIndex(builds.findIndex((build) => build.id == saveId));
  }, [builds])

  useEffect(() => {
    setIsError(false);
    setMessage("");
  }, [saveLoading])
  
  useEffect(() => {
    if (selectedIndex > -1) setDisableNew(false);
    else setDisableNew(true);
  }, [selectedIndex])

  const handleSave = async () => {
    setSaveLoading(true);
    
    const buildData = {
      selectedClass: selectedClass.name,
      selectedArmours: selectedArmours.map((armour: Armour | null) => { if (armour) return(armour.name)}), 
      selectedTalismans: selectedTalismans.map((talisman: Talisman| null) => { if (talisman) return(talisman.name)}), 
      selectedWeapons: selectedWeapons.map((weapon: Weapon | null) => { if (weapon) return(weapon.name)}), 
      selectedAshes: selectedAshes.map((ash: Ash | null) => { if (ash) return(ash.name)}), 
      selectedWepLvls: selectedWepLvls,
      selectedAffinities: selectedAffinities, 
      selectedRune: selectedRune ? selectedRune.name : null, 
      selectedArrows: selectedArrows.map((arrow: Ammo | null) => { if (arrow) return(arrow.name)}), 
      selectedBolts: selectedBolts.map((bolt: Ammo | null) => { if (bolt) return(bolt.name)}), 
      selectedSpells: selectedSpells.map((spell: Spell | null) => { if (spell) return(spell.name)}), 
      characterStats: characterStats
    }

    
    if (!currentUser) {
      await delay(100);
      setIsError(true);
      setMessage("Save failed. You must be logged in to save builds.");
      await delay(2510);
      setSaveLoading(false);
      return;
    }

    
    if (buildName.length < 3) {
      await delay(10);
      setIsError(true);
      setMessage("Save failed. Build name must be at least 3 characters long.");
      await delay(2510);
      setSaveLoading(false);
      return;
    }
    if (saveId < 0) {
      const nameExists = await checkNameExists(uid, buildName);
      
      if (nameExists) {
        setIsError(true);
        setMessage("Save failed. Build name already exists.");
        await delay(2510);
        setSaveLoading(false);
        return;
      } 
      const sentData = {
        uid: uid,
        name: buildName,
        build: buildData,
        isPublic: false
      }
      try {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "builds", 
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(sentData)
        })
        .then(res=> res.json())
        .then(data => setSaveId(data.id))
      }
      catch (error) {
        setIsError(true);
        setMessage("Server error.");
        await delay(2510);
        setSaveLoading(false);
        return;
      }

    }
    else {
      if (oldBuildName != buildName) {
        const nameExists = await checkNameExists(uid, buildName);

        if (nameExists) {
          setIsError(true);
          setMessage("Save failed. Build name already exists.");
          await delay(2510);
          setSaveLoading(false);
          return;
        } 
      }

      const sentData = {
        name: buildName,
        build: buildData,
        isPublic: false
      }

      try {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "builds/" + saveId, 
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(sentData)
        })
        .then(res=> {if (!res.ok) throw new Error()})
      }
      catch (error) {
        setIsError(true);
        setMessage("Server error.");
        await delay(2510);
        setSaveLoading(false);
        return;
      }
    }

    setOldBuildName(buildName);
    setCurrentBuild({
      selectedClass: selectedClass,
      selectedArmours: selectedArmours, 
      selectedTalismans: selectedTalismans, 
      selectedWeapons: selectedWeapons, 
      selectedAshes: selectedAshes, 
      selectedWepLvls: selectedWepLvls,
      selectedAffinities: selectedAffinities, 
      selectedRune: selectedRune ? selectedRune.name : null, 
      selectedArrows: selectedArrows, 
      selectedBolts: selectedBolts, 
      selectedSpells: selectedSpells, 
      characterStats: characterStats
    });
    setSaveable(false);
    setMessage("Build saved succesfully!");
    await delay(2510);
    setSaveLoading(false);
  }

  const handleLoad = async () => {
    if (!currentUser) {
      await delay(100);
      setIsError(true);
      setMessage("You must be logged in to view your builds.");
      await delay(2510);
      setMessage("")
      return;
    }
    setLoadOpen(!loadOpen);
  }

  const onDropDownSelect = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setBuildName(builds[newIndex].name);
    setOldBuildName(builds[newIndex].name);
    setSaveId(builds[newIndex].id);
    setLoadOpen(false);
    
    setLoadingBuild(true);
  }

  const handleNew = () => {
    setOldBuildName("");
    setSelectedIndex(-1);
    setLoadingBuild(true);
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
      setSelectedAshes(selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)));
      setSelectedAffinities(selectedBuild.selectedAffinities);
      setSelectedWepLvls(selectedBuild.selectedWepLvls);
      setSelectedArrows(selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)));
      setSelectedBolts(selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)));
      setSelectedSpells(selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)));

      setCurrentBuild({
        selectedClass: getItemFromName(selectedBuild.selectedClass, classes),
        selectedArmours: selectedBuild.selectedArmours.map((armour: string) => getItemFromName(armour, armours)), 
        selectedTalismans: selectedBuild.selectedTalismans.map((name: string) => getItemFromName(name, talismans)), 
        selectedWeapons: selectedBuild.selectedWeapons.map((name: string) => getItemFromName(name, weapons)), 
        selectedAshes: selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)), 
        selectedWepLvls: selectedBuild.selectedWepLvls,
        selectedAffinities: selectedBuild.selectedAffinities, 
        selectedRune: getItemFromName(selectedBuild.selectedRune, greatRunes),
        selectedArrows: selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)), 
        selectedBolts: selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)), 
        selectedSpells: selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)), 
        characterStats: selectedBuild.characterStats
      });
    }
    else {
      resetBuild();
    }
    setSaveable(false);
    setTimeout(() => setLoadingBuild(false), 750);
  }, [selectedIndex])



  return (
    <div className="file-panel">
      <div>
        <label>Build Name: </label>
        <div className="input-container" ref={ref}>
          <input type="text" style={{marginTop: "5px"}} value={buildName} onChange={e => setBuildName(e.target.value)}/>
          <div className="load-container">
            {
              loadOpen ? 
              <div className="dummy-button"><i className="fa fa-angle-down rotate" aria-hidden="true"/></div>
              :
              <button onClick={handleLoad} className={message ? "disabled" : ""}><i className={(!loadOpen ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"/></button>
            }
          </div>
        </div>
        
        {loadOpen && <div ref={dropDownRef} style={{transform: "translateY(5px)"}}><DropDown items={builds} index={selectedIndex} isNullable={false} hasImages={false} showSelected={false} width={buildNameWidth} onChange={onDropDownSelect} /></div>}
        
      </div>
      <button onClick={handleNew} className={disabledNew ? "disabled" : ""}>New</button>
      <button onClick={handleSave} className={saveLoading || loadingBuild || (!saveable && oldBuildName == buildName) ? "disabled" : ""} disabled={saveLoading}>Save</button>
      {message && <div className="message" style={{color: isError ? "red" : " white"}}>{message}</div>}
    </div>
  )
}

export default FilePanel
