'use client'
import { useState } from "react"
import { DropDown } from "."

interface Stat {
    name: string,
    amount: number
}

interface ScalesWith {
    name: string,
    scaling: string
}

interface Weapon {
    id: string,
    name: string,
    attack: Stat[],
    defence: Stat[],
    scalesWith: ScalesWith[],
    requiredAttributes: Stat[],
    category: string,
    weight: number
}

interface Props {
    weapons: Weapon[],
    indices: number[],
    onChange: Function
}

function WeaponsPanel({weapons, indices, onChange} : Props) {
    const[currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        const newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;
        onChange(newIndeces);
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