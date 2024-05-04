import { AuthContext, AuthContextProvider } from "@/context/AuthContext";
import BuildCreatorContext from "@/context/BuildCreatorContext";
import { FilePanelContext } from "@/context/FilePanelContext";
import { checkNameExists } from "@/helpers/FileHelper";
import { Armour, Talisman, Weapon, Ash, CrystalTear, Ammo, Spell } from "@/helpers/types";
import { delay } from "@/utils";
import { useContext } from "react";

function SaveButton() {
    const { selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, selectedWepLvls, selectedAffinities, selectedRune, selectedTears, selectedArrows, selectedBolts, selectedSpells, characterStats,
            isPublic, loadingBuild, saveable, setSaveable, saveId, setSaveId, setCurrentBuild, buildName, description} 
            = useContext(BuildCreatorContext);
    
    const { oldBuildName, oldDescription, saveLoading, setSaveLoading, setIsError, setMessage, setOldBuildName, setOldDescription } = useContext(FilePanelContext);
    const { currentUser } = useContext(AuthContext);

    let uid = "";
    if (currentUser) uid = currentUser.uid;

    /**
     * BIG AND MESSY HANDLER FOR SAVE BUTTON
     * TODO: TIDY UP THIS SHIET
     * @returns 
     */
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
          selectedTears: selectedTears.map((tear: CrystalTear | null) => { if (tear) return(tear.name)}),
          selectedArrows: selectedArrows.map((arrow: Ammo | null) => { if (arrow) return(arrow.name)}), 
          selectedBolts: selectedBolts.map((bolt: Ammo | null) => { if (bolt) return(bolt.name)}), 
          selectedSpells: selectedSpells.map((spell: Spell | null) => { if (spell) return(spell.name)}), 
          characterStats: characterStats
        }
    
        if (!currentUser) {
          await delay(1);
          setIsError(true);
          setMessage("Save failed. You must be logged in to save builds.");
          await delay(2510);
          setSaveLoading(false);
          return;
        }
    
        if (buildName.length < 3 || buildName.length > 64) {
          await delay(1);
          setIsError(true);
          setMessage("Save failed. Build name must be between 3-64 characters long.");
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
            description: description,
            build: buildData,
            isPublic: isPublic
          }
    
          try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "builds", 
            {
              method: "POST",
              headers: {
                "Authorization" : `Bearer ${currentUser.accessToken}` 
              },
              mode: "cors",
              body: JSON.stringify(sentData)
            })
            .then(res => {
              if (!res.ok) throw Error;
              return res.json()
            })
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
            description: description,
            build: buildData,
            isPublic: isPublic
          }
    
          try {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "builds/" + saveId, 
            {
              method: "PUT",
              headers: { 
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${currentUser.accessToken}` 
              },
              mode: "cors",
              body: JSON.stringify(sentData)
            })
            .then(res => {if (!res.ok) throw new Error()})
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
        setOldDescription(description);
        setCurrentBuild({
          selectedClass: selectedClass,
          selectedArmours: selectedArmours, 
          selectedTalismans: selectedTalismans, 
          selectedWeapons: selectedWeapons, 
          selectedAshes: selectedAshes, 
          selectedWepLvls: selectedWepLvls,
          selectedAffinities: selectedAffinities, 
          selectedRune: selectedRune, 
          selectedTears: selectedTears,
          selectedArrows: selectedArrows, 
          selectedBolts: selectedBolts, 
          selectedSpells: selectedSpells, 
          characterStats: characterStats,
          isPublic: isPublic
        });
        await delay(1);
        setSaveable(false);
        setMessage("Build saved succesfully!");
        await delay(2510);
        setSaveLoading(false);
    }
    return (
        <button onClick={handleSave} className={saveLoading || loadingBuild || (!saveable && oldBuildName == buildName && oldDescription == description) ? "disabled" : ""} disabled={saveLoading}>Save</button>
    )
}

export default SaveButton