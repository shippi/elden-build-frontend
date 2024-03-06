'use client'

import { useState } from "react"
import { DropDown } from "."
import { Armour } from "./types"

interface Props {
    armours: Armour[],
    onChange: Function
}


function ArmourPanel({armours, onChange} : Props) {
    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const[currIndex, setCurrIndex] = useState(0);

    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Helm")),
        [...armours].filter(armour => (armour.category == "Chest Armor")),
        [...armours].filter(armour => (armour.category == "Gauntlets")),
        [...armours].filter(armour => (armour.category == "Leg Armor"))
    ]

    const handleOnChange = (newIndex: number) => {
        let newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;

        const selectedArmours = getSelectedArmours(armours, newIndeces);

        setIndices(newIndeces);
        onChange(selectedArmours);
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

function getSelectedArmours(armours: Armour[], armourIndices: number[]) {
    const armoursArr = [
      [...armours].filter(armour => (armour.category == "Helm")),
      [...armours].filter(armour => (armour.category == "Chest Armor")),
      [...armours].filter(armour => (armour.category == "Gauntlets")),
      [...armours].filter(armour => (armour.category == "Leg Armor"))
    ]
  
    let selectedArmours: any[] = [null, null, null, null];
    armourIndices.forEach((i, j) => {
      if (i > -1) {
        selectedArmours[j] = armoursArr[j][i];
      }
     
    });
    return selectedArmours;
}