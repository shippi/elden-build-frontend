'use client'

import { useState } from "react"
import { DropDown } from ".."
import { Armour } from "../types"

interface Props {
    armours: Armour[],
    onChange: Function
}


function ArmourPanel({armours, onChange} : Props) {
    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const[currIndex, setCurrIndex] = useState(0);

    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Head")),
        [...armours].filter(armour => (armour.category == "Chest")),
        [...armours].filter(armour => (armour.category == "Arms")),
        [...armours].filter(armour => (armour.category == "Legs"))
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
                            <DropDown items={armoursArr[j]} index={indices[j]} isNullable={true} onChange={handleOnChange} hasImages={true}/>
                        </div>
                    ))
                }
            </div>
            <br/>
            {/* div for displaying active effects from armour */}
            <div className="active-effects">
                <label>Active Effects:</label>
                <ul>
                {
                    getSelectedArmours(armours, indices).map((armour, i) => (
                        armour?.effect == null ? "" : 
                        <li>{armour.effect}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default ArmourPanel

/**
 * Used to get the armours that a user has selected based on indices chosen in dropdown.
 * @param armours 
 * @param armourIndices 
 * @returns 
 */
function getSelectedArmours(armours: Armour[], armourIndices: number[]) {
    // organises each armor category into their own arrays
    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Head")),
        [...armours].filter(armour => (armour.category == "Chest")),
        [...armours].filter(armour => (armour.category == "Arms")),
        [...armours].filter(armour => (armour.category == "Legs"))
    ]
    
    let selectedArmours: any[] = [null, null, null, null];

    // goes through each value in armourIndices to grab armour from armoursArr
    armourIndices.forEach((i, j) => {
      if (i > -1) { // checks if index/value is -1, if so leaves value as null
        selectedArmours[j] = armoursArr[j][i];
      }
     
    });
    return selectedArmours;
}