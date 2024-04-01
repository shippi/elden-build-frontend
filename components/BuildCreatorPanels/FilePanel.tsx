'use client'
import { AuthContext } from "@/context/AuthContext"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useEffect, useState } from "react"
import { Ammo, Armour, Ash, GreatRune, Spell, Talisman, Weapon } from "@/helpers/types";
import { weapons } from "@/public/data";
import { delay } from "@/utils";

function FilePanel() {
  const {buildName, setBuildName, selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, selectedWepLvls, selectedAffinities, selectedRune, selectedArrows, selectedBolts, selectedSpells, characterStats} = useContext(BuildCreatorContext)
  const {currentUser} = useContext(AuthContext);

  const [saveLoading, setSaveLoading] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [saveId, setSaveId] = useState<number>(-1);
  
  useEffect(() => {
    setDisplaySuccess(false)
  }, [saveLoading])

  console.log(displaySuccess);

  const handleSave = async () => {
    if (!currentUser) {
      return;
    }

    const uid = currentUser.uid;

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
      .then(data => console.log(data))
      .catch(error => console.log(error));
    }
    setDisplaySuccess(true);
    await delay(2510);
    setSaveLoading(false);
    
  }

  return (
    <div className="file-panel">
      <div>
        <label>Build Name: </label>
        <input type="text" value={buildName} onChange={e => setBuildName(e.target.value)}/>
      </div>
      <button>Load</button>
      <button onClick={handleSave} className={saveLoading ? "disabled" : ""} disabled={saveLoading}>Save</button>
      {displaySuccess && <div className="success-message">Build saved succesfully!</div>}
    </div>
  )
}

export default FilePanel
