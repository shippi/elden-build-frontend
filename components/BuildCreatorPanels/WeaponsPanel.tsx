'use client'
import { useState } from "react"
import { DisabledDropDown, DropDown } from ".."
import { getSelectedItems } from "@/utils/BuildCreatorUtils"
import { Ash, Weapon } from "../types"
import { wepLevelsData } from "@/public/data"

interface Props {
    weapons: Weapon[],
    ashes: Ash[],
    affinities: any[],
    onChange: Function
}

function WeaponsPanel({weapons, ashes, affinities, onChange} : Props) {
    const [wepIndices, setWepIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const [ashIndices, setAshIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const [affIndices, setAffIndices] = useState([0, 0, 0, 0, 0, 0]);
    const [lvlIndices, setLvlIndices] = useState([0, 0, 0, 0, 0, 0]);
    const [currIndex, setCurrIndex] = useState(0);

    const handleWepOnChange = (newIndex: number) => {
        let newIndices = [...wepIndices];
        newIndices[currIndex] = newIndex;
        const selectedWeapons = getSelectedItems(weapons, newIndices);

        let newAffIndices = [...affIndices];
        newAffIndices[currIndex] = 0;
        const selectedAffinities = getSelectedItems(affinities, newAffIndices).map(aff => aff.name);

        let newLvlIndices = [...lvlIndices];
        newAffIndices[currIndex] = 0;
        const selectedLvls = getSelectedItems(wepLevelsData, newLvlIndices).map(lvl => lvl.name);

        if (newIndex > -1 && !weapons[newIndex].unique) {
            const availableAshes = getAvailableAshes(ashes, weapons[newIndex].type)
            const currentAshIndex = getAshIndex(availableAshes, weapons[newIndex].defaultSkill)
            let newAshIndices = [...ashIndices];
            newAshIndices[currIndex] = currentAshIndex;
            setAshIndices(newAshIndices);
            const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newAshIndices)
            setWepIndices(newIndices);
            onChange(selectedWeapons, selectedAshes, selectedAffinities);
        }
        else {
            const selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices);
            setWepIndices(newIndices);
            onChange(selectedWeapons, selectedAshes, selectedAffinities);
        }
    }

    const handleAshOnChange = (newIndex: number) => {
        let newIndices = [...ashIndices];
        newIndices[currIndex] = newIndex;
        setAshIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newIndices);
        const selectedAffinities = getSelectedItems(affinities, affIndices).map(aff => aff.name);
        const selectedLvls = getSelectedItems(wepLevelsData, lvlIndices).map(lvl => lvl.name);
        onChange(selectedWeapons, selectedAshes, selectedAffinities, selectedLvls);
    }

    const handleAffOnChange = (newIndex: number) => {
        let newIndices = [...affIndices];
        newIndices[currIndex] = newIndex;
        setAffIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices);
        const selectedAffinities = getSelectedItems(affinities, newIndices).map(aff => aff.name);
        const selectedLvls = getSelectedItems(wepLevelsData, lvlIndices).map(lvl => lvl.name);
        onChange(selectedWeapons, selectedAshes, selectedAffinities, selectedLvls);
    }

    const handleLvlOnChange = (newIndex: number) => {
        let newIndices = [...lvlIndices];
        newIndices[currIndex] = newIndex;
        setLvlIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices);
        const selectedAffinities = getSelectedItems(affinities, affIndices).map(aff => aff.name);
        const selectedLvls = getSelectedItems(wepLevelsData, newIndices).map(lvl => lvl.name);

        onChange(selectedWeapons, selectedAshes, selectedAffinities, selectedLvls);
    }
    return (
        <div className="weapons-panel">
            {/* div for selecting weapons*/}
            <div>
                {
                    wepIndices.map((i, j) => (
                        <div onClick={() => {setCurrIndex(j)}}>
                            <label>{(j < 3 ? "Left Hand " : "Right Hand ") + (j % 3 + 1)} </label>
                            <DropDown items={weapons} index={wepIndices[j]} isNullable={true} onChange={handleWepOnChange} hasImages={true}/>
                            <div className="weapon-options">
                                { 
                                    weapons[wepIndices[j]]?.unique ? <DisabledDropDown value={weapons[wepIndices[j]].defaultSkill}/> :
                                    wepIndices[j] < 0 ? <DisabledDropDown value={"Ash of War"} /> :
                                    <DropDown items={getAvailableAshes(ashes, weapons[wepIndices[j]].type)} index={ashIndices[j]} isNullable={false} hasImages={false} onChange={handleAshOnChange} />
                                }
                                <div className="affinity">
                                    {
                                        weapons[wepIndices[j]]?.changeAffinity ?
                                        <DropDown items={affinities} index={affIndices[j]} isNullable={false} hasImages={false} onChange={handleAffOnChange} /> :
                                        <DisabledDropDown value={"Affinity"} />
                                    }
                                </div>
                                <div className="levels">
                                    {
                                        wepIndices[j] > -1 && !weapons[wepIndices[j]]?.unique ? <DropDown items={wepLevelsData} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                                        wepIndices[j] > -1 && weapons[wepIndices[j]].unique ? <DropDown items={wepLevelsData.slice(0, 11)} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                                        <DisabledDropDown value={"+0"} />
                                    }
                                </div>
                            </div>
                            <br/>
                        </div>
                        
                    ))
                }
            </div>
        </div>
    )
}

export default WeaponsPanel

function getAvailableAshes(ashes: Ash[], wepType: string) {
    return ashes.filter(ash => ash.availability[wepType as keyof typeof ash.availability] == true);
}

function getAshIndex(ashes: Ash[], ashName: string) {
    let index = 0;
    ashes.forEach((ash, i) => {
        if (ash.name == ashName) index = i
    })
    return index;
}

function getSelectedAshes(weps: Weapon[], ashes: Ash[], ashIndices: number[]) {
    let selectedAshes = new Array(weps.length).fill(null);

    weps.forEach((wep, i) => {
        if (wep && !wep.unique) {
            selectedAshes[i] = getAvailableAshes(ashes, wep.type)[ashIndices[i]]
        }
    })

    return selectedAshes;
}
