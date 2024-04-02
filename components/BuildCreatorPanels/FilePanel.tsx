'use client'
import { AuthContext } from "@/context/AuthContext"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useEffect, useRef, useState } from "react"
import { Ammo, Armour, Ash, Spell, Talisman, Weapon } from "@/helpers/types";
import { delay } from "@/utils";
import { checkNameExists } from "@/helpers/FileHelper";
import { DropDown } from "..";
import { useClickOutside } from "@/hooks";
import { affinities, armours, arrows, ashes, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data";
import { getIndexOfItem, getItemFromName } from "@/helpers/BuildCreatorHelper";

function FilePanel() {
  const { selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, selectedWepLvls, selectedAffinities, selectedRune, selectedArrows, selectedBolts, selectedSpells, characterStats,
          setSelectedClass, setSelectedArmours, setSelectedTalismans, setSelectedWeapons, setSelectedAshes, setSelectedWepLvls, setSelectedAffinities, setSelectedRune, setSelectedArrows, setSelectedBolts, 
          setSelectedSpells, setCharacterStats } 
         = useContext(BuildCreatorContext);

  const {currentUser} = useContext(AuthContext);
 
  const [saveLoading, setSaveLoading] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  
  const [buildName, setBuildName] = useState("Untitled");
  const [saveId, setSaveId] = useState<number>(-1);
  const [builds, setBuilds] = useState<any[]>([]);
  const [buildNameWidth, setBuildNameWidth] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  let uid = "";
  if (currentUser) uid = currentUser.uid;


  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && currentUser) setBuildNameWidth(ref.current.offsetWidth + "px")
  })

  const dropDownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropDownRef, () => {setLoadOpen(false)});

  useEffect(() => {
    if (currentUser && uid) {
      const res = async() => {
        await fetch(process.env.NEXT_PUBLIC_API_URL + `builds?uid=${uid}`)
        .then(async res => await res.json())
        .then(data => setBuilds(data.sort((a: any, b: any) => a.name.localeCompare(b.name))))
      }
      res()
    }
  }, [loadOpen, displaySuccess])

  useEffect(() => {
    setSelectedIndex(builds.findIndex((build) => build.id == saveId))
  }, [builds])

  useEffect(() => {
    setDisplaySuccess(false)
  }, [saveLoading])
  
  const handleSave = async () => {
    if (!currentUser) {
      return;
    }
    
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

    setSaveLoading(true);

    if (saveId < 0) {
      const nameExists = await checkNameExists(uid, buildName);

      if (nameExists) {
        setSaveLoading(false);
        return;
      } 
      const sentData = {
        uid: uid,
        name: buildName,
        build: buildData,
        isPublic: false
      }
    
      await fetch(process.env.NEXT_PUBLIC_API_URL + "builds", 
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(sentData)
        })
        .then(res=> res.json())
        .then(data => setSaveId(data.id))
        .catch(error => console.log(error));
    }
    else {
      const sentData = {
        name: buildName,
        build: buildData,
        isPublic: false
      }

      await fetch(process.env.NEXT_PUBLIC_API_URL + "builds/" + saveId, 
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(sentData)
      })
      .then(res=> res.json())
      .catch(error => console.log(error));
    }
    setDisplaySuccess(true);
    await delay(2510);
    setSaveLoading(false);
    
  }

  const handleLoad = async () => {
    if (!currentUser) {
      return;
    }
    setLoadOpen(!loadOpen);
  }

  const onDropDownSelect = (newIndex: number) => {
    setSelectedIndex(newIndex);
    setBuildName(builds[newIndex].name);
    setSaveId(builds[newIndex].id);
    setLoadOpen(false);
    
    const selectedBuild = builds[newIndex].build
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

    setCharacterStats(selectedBuild.characterStats);
  }

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
              <button onClick={handleLoad}><i className={(!loadOpen ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"/></button>
            }
            
            
          </div>
         
        </div>
        <div style={{height: "5px"}}/>
        {loadOpen && <div ref={dropDownRef}><DropDown items={builds} index={selectedIndex} isNullable={false} hasImages={false} showSelected={false} width={buildNameWidth} onChange={onDropDownSelect} /></div>}

      </div>
      <button>New</button>
      <button onClick={handleSave} className={saveLoading ? "disabled" : ""} disabled={saveLoading}>Save</button>
      {displaySuccess && <div className="success-message">Build saved succesfully!</div>}
    </div>
  )
}

export default FilePanel
