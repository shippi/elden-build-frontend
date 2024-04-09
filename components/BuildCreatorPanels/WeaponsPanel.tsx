'use client'
import { useContext, useState } from "react"
import { DisabledDropDown, DropDown, PanelTitle } from ".."
import { getIndexOfItem, getIndicesOfItems, getSelectedItems, getTotalStats, isRequiredStatsMet } from "@/helpers/BuildCreatorHelper"
import { getAshIndex, getAvailableAshes, getSelectedAshes } from "@/helpers/WeaponsHelper"
import { weapons, affinities, wepLevels, ashes } from "@/public/data"
import { Weapon } from "@/helpers/types"
import BuildCreatorContext from "@/context/BuildCreatorContext"

function WeaponsPanel() {
    const { selectedClass, characterStats, selectedArmours, selectedTalismans, selectedWeapons, selectedWepLvls, selectedAshes, selectedAffinities, twoHanded, runeEffect, 
            setSelectedWeapons, setSelectedAshes, setSelectedAffinities, setSelectedWepLvls, setTwoHanded, tearActivated, selectedTears} = useContext(BuildCreatorContext);

    const [wepIndices, setWepIndices] = useState(getIndicesOfItems(selectedWeapons, weapons));
    const [ashIndices, setAshIndices] = useState(
        selectedWeapons.map((wep: Weapon, i: number) => {
            if (wep && selectedAshes[i]) {
                const availableAshes = getAvailableAshes(ashes, wep.type);
                const index = getIndexOfItem(selectedAshes[i].name, availableAshes);
                return index;
            }
            else return -1;
        })
    );
    const [affIndices, setAffIndices] = useState(
        selectedAffinities.map((aff: string) => {
        return getIndexOfItem(aff, affinities);
    }));
    const [lvlIndices, setLvlIndices] = useState(selectedWepLvls);
    const [currIndex, setCurrIndex] = useState(0);

    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, twoHanded, runeEffect, tearActivated ? selectedTears : undefined);
    const selectorPanels = [];

    
    const handleWepOnChange = (newIndex: number) => {
        let newIndices = [...wepIndices];
        newIndices[currIndex] = newIndex;
        const selectedWeapons = getSelectedItems(weapons, newIndices);
        setWepIndices(newIndices);

        let newAffIndices = [...affIndices];
        newAffIndices[currIndex] = 0;
        const selectedAffinities = getSelectedItems(affinities, newAffIndices).map(aff => aff.name);

        let newLvlIndices = [...lvlIndices];
        newLvlIndices[currIndex] = 0;
        const selectedLvls = getSelectedItems(wepLevels, newLvlIndices).map(lvl => +lvl.name.substring(1));
        setLvlIndices(newLvlIndices);

        let selectedAshes;

        if (newIndex > -1 && !weapons[newIndex].unique) {
            const availableAshes = getAvailableAshes(ashes, weapons[newIndex].type)
            const currentAshIndex = getAshIndex(availableAshes, weapons[newIndex].defaultSkill)
           
            let newAshIndices = [...ashIndices];
            newAshIndices[currIndex] = currentAshIndex;
            setAshIndices(newAshIndices);
            selectedAshes = getSelectedAshes(selectedWeapons, ashes, newAshIndices);
        }
        else {
            selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices);  
            setWepIndices(newIndices);
        }
        setSelectedWeapons(selectedWeapons);
        setSelectedAffinities(selectedAffinities);
        setSelectedAshes(selectedAshes);
        setSelectedWepLvls(selectedLvls);
    }

    const handleAshOnChange = (newIndex: number) => {
        let newIndices = [...ashIndices];
        newIndices[currIndex] = newIndex;
        setAshIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newIndices);

        setSelectedAshes(selectedAshes);
    }

    const handleAffOnChange = (newIndex: number) => {
        let newIndices = [...affIndices];
        newIndices[currIndex] = newIndex;
        setAffIndices(newIndices);

        const selectedAffinities = getSelectedItems(affinities, newIndices).map(aff => aff.name);
       
        setSelectedAffinities(selectedAffinities);
    }

    const handleLvlOnChange = (newIndex: number) => {
        let newIndices = [...lvlIndices];
        newIndices[currIndex] = newIndex;
        setLvlIndices(newIndices);

        const selectedLvls = getSelectedItems(wepLevels, newIndices).map(lvl => +lvl.name.substring(1));
        setSelectedWepLvls(selectedLvls);
    }
    
    for (let i = 0; i < 2; i++) {
        const condition = (i: number, j:number) => {
            if (i == 0) return j < 3;
            else return j >= 3;
        }

        selectorPanels.push(wepIndices.map((value, j) => (
            condition(i, j) &&
            <div className="selector" onClick={() => {setCurrIndex(j)}} key={j}>
                <label>{j < 3 ? "Left Armament " + (j % 3 + 1) : "Right Armament " + (j % 3 + 1)}</label>
                <DropDown items={weapons} index={wepIndices[j]} isNullable={true} onChange={handleWepOnChange} hasImages={true} searchEnabled={true}/>
                
                <div className="requirements-text" data-alt={isRequiredStatsMet(weapons[wepIndices[j]]?.requiredAttributes, totalStats, twoHanded).reqTitle}>
                {  
                    isRequiredStatsMet(weapons[wepIndices[j]]?.requiredAttributes, totalStats).isMet ? "" : 
                    isRequiredStatsMet(weapons[wepIndices[j]]?.requiredAttributes, totalStats, twoHanded).reqMessage
                }
                </div>
                <div className="weapon-options">
                    <div className="ashes">
                    { 
                        weapons[wepIndices[j]]?.unique || weapons[wepIndices[j]]?.disableAsh == true ? 
                        <DisabledDropDown value={weapons[wepIndices[j]].defaultSkill}/> :
                        wepIndices[j] < 0 ? <DisabledDropDown value={"Ash of War"} /> :
                        <DropDown items={getAvailableAshes(ashes, weapons[wepIndices[j]].type)} index={ashIndices[j]} isNullable={false} hasImages={false} onChange={handleAshOnChange} searchEnabled={true}/>
                    }
                    </div>
                    <div className="affinity">
                        {
                            weapons[wepIndices[j]]?.changeAffinity ?
                            <DropDown items={affinities} index={affIndices[j]} isNullable={false} hasImages={false} onChange={handleAffOnChange} /> :
                            <DisabledDropDown value={"Affinity"} />
                        }
                    </div>
                    <div className="levels">
                        {
                            wepIndices[j] > -1 && !weapons[wepIndices[j]]?.unique ? <DropDown items={wepLevels} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                            wepIndices[j] > -1 && weapons[wepIndices[j]].unique ? <DropDown items={wepLevels.slice(0, 11)} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                            <DisabledDropDown value={"+0"} />
                        }
                    </div>
                </div>
                <div className="weapon-effect">{weapons[wepIndices[j]]?.effect && "Weapon Effect: " + weapons[wepIndices[j]].effect}</div>
                <br/>
            </div>
        )));
    }

    return (
        <>
        <PanelTitle text="Weapons" img="icons/weapons.png"/>
        <div className="weapons-panel">
            {/* div for selecting weapons*/}
                <div className="selectors-container">
                    { selectorPanels[0] } <br/>  
                    <div className="checkbox-container" onClick={() => setTwoHanded(!twoHanded)}>
                        <input type="checkbox" checked={twoHanded} onChange={() => setTwoHanded(!twoHanded)}/>
                        Two-Handed
                    </div>
                </div>
                <div className="selectors-container"> { selectorPanels[1] } </div>
        </div>
        </>
    )
}

export default WeaponsPanel

