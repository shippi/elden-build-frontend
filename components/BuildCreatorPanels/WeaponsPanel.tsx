'use client'
import { useState } from "react"
import { DisabledDropDown, DropDown } from ".."
import { getSelectedItems } from "@/utils/BuildCreatorUtils"
import { Ash, Weapon } from "../types"


interface Props {
    weapons: Weapon[],
    ashes: Ash[],
    onChange: Function
}

function WeaponsPanel({weapons, ashes, onChange} : Props) {
    const [wepIndices, setWepIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const [ashIndices, setAshIndices] = useState([-1, -1, -1, -1, -1, -1])
    const [currIndex, setCurrIndex] = useState(0);

    const handleWepOnChange = (newIndex: number) => {
        let newIndices = [...wepIndices];
        newIndices[currIndex] = newIndex;
        
        const selectedWeapons = getSelectedItems(weapons, newIndices);

        if (newIndex > -1 && !weapons[newIndex].unique) {
            const availableAshes = getAvailableAshes(ashes, weapons[newIndex].type)
            const currentAshIndex = getAshIndex(availableAshes, weapons[newIndex].defaultSkill)
            let newAshIndices = [...ashIndices];
            newAshIndices[currIndex] = currentAshIndex;
            setAshIndices(newAshIndices);
            const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newAshIndices)
            setWepIndices(newIndices);
            onChange(selectedWeapons, selectedAshes);
        }
        else {
            const selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices)
            setWepIndices(newIndices);
            onChange(selectedWeapons, selectedAshes);
        }
        

    }

    const handleAshOnChange = (newIndex: number) => {
        let newIndices = [...ashIndices];
        newIndices[currIndex] = newIndex;
        setAshIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newIndices);
        onChange(selectedWeapons, selectedAshes);
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
                            { 
                                weapons[wepIndices[j]]?.unique ? <DisabledDropDown value={weapons[wepIndices[j]].defaultSkill}/> :
                                wepIndices[j] < 0 ? <DisabledDropDown value={"Ash of War"} /> :
                                <DropDown items={getAvailableAshes(ashes, weapons[wepIndices[j]].type)} index={ashIndices[j]} isNullable={false} hasImages={false} onChange={handleAshOnChange} />
                            }
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