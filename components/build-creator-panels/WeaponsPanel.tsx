'use client'
import { useState } from "react"
import { DropDown } from ".."
import { getSelectedItems } from "@/utils/BuildCreatorUtils"
import { Weapon } from "../types"


interface Props {
    weapons: Weapon[],
    onChange: Function
}

function WeaponsPanel({weapons, onChange} : Props) {
    const [indices, setIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const[currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        let newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;

        const selectedTalismans = getSelectedItems(weapons, newIndeces);

        setIndices(newIndeces);
        onChange(selectedTalismans);
    }

    return (
        <div className="weapons-panel">
            {/* div for selecting talismans*/}
            <div>
                {
                    indices.map((i, j) => (
                        <div onClick={() => {setCurrIndex(j)}}>
                            <label>{(j < 3 ? "Left Hand " : "Right Hand ") + (j % 3 + 1)} </label>
                         <DropDown items={weapons} index={indices[j]} isNullable={true} onChange={handleOnChange}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default WeaponsPanel