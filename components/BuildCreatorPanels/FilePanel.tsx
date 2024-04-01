'use client'
import { AuthContext } from "@/context/AuthContext"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useState } from "react"
import { Ammo, Armour, Ash, GreatRune, Spell, Talisman, Weapon } from "@/helpers/types";
import { weapons } from "@/public/data";

function FilePanel() {
  const {buildName, setBuildName, selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, selectedWepLvls, selectedAffinities, selectedRune, selectedArrows, selectedBolts, selectedSpells, characterStats} = useContext(BuildCreatorContext)
  const {currentUser} = useContext(AuthContext);

  const [saveLoading, setSaveLoading] = useState(false);
  const handleSave = async () => {
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

    const sentData = {
      uid: uid,
      name: buildName,
      build: buildData,
      isPublic: false
    }

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "builds", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(sentData)
    }).catch(error => console.log(error));
  }

  return (
    <div className="file-panel">
      <div>
        <label>Build Name: </label>
        <input type="text" value={buildName} onChange={e => setBuildName(e.target.value)}/>
      </div>
      <button>Load</button>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}

export default FilePanel
