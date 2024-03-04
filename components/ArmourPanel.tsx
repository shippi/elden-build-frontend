'use client'

import { useState } from "react"
import { DropDown } from "."

interface DamageNegation {
    name: string,
    amount: number
}

interface Armour {
    id: string,
    name: string,
    category: string,
    dmgNegation: DamageNegation[]
}


interface Props {
    armours: Armour[],
    indices: number[],
    onChange: Function
}


function ArmourPanel({armours, indices, onChange} : Props) {
    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Helm")),
        [...armours].filter(armour => (armour.category == "Chest Armor")),
        [...armours].filter(armour => (armour.category == "Gauntlets")),
        [...armours].filter(armour => (armour.category == "Leg Armor"))
    ]

    const[currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        const newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;
        onChange(newIndeces);
    }

    const armourSwitch = (index: number) => {
        switch(index) {
            case 0:
                return "Helmet"
            case 1:
                return "Chest"
            case 2: 
                return "Gauntlets"
            case 3:
                return "Legs"
        }
    }

    return (
        <div className="armour-panel">
            {/* div for selecting chest armour */}
            <div>
                {
                    indices.map((i, j) => (
                        <div onClick={() => {setCurrIndex(j)}}>
                            <label>{armourSwitch(j)}</label>
                            <DropDown items={armoursArr[j]} index={indices[j]} isNullable={true} onChange={handleOnChange}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ArmourPanel