'use client'
import { useContext, useEffect, useState } from "react"
import { DropDown, PanelTitle } from ".."
import { armours } from "@/public/data"
import { getSelectedArmours } from "@/helpers/ArmourPanelHelper"
import { getIndexOfItem, handleDropdownChange } from "@/helpers/BuildCreatorHelper"
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { Armour } from "@/helpers/types"


function ArmourPanel() {
    const {selectedArmours, setSelectedArmours} = useContext(BuildCreatorContext);

    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const [currIndex, setCurrIndex] = useState(0);

    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Head")),
        [...armours].filter(armour => (armour.category == "Chest")),
        [...armours].filter(armour => (armour.category == "Arms")),
        [...armours].filter(armour => (armour.category == "Legs"))
    ]

    useEffect(() => {
        let indices = [-1, -1, -1, -1]
        

        setIndices(selectedArmours.map((armour: Armour, i: number) => { 
            if (armour) return getIndexOfItem(armour.name, armoursArr[i]);
            else return -1;
        }))
    }, [selectedArmours]);
    
    const handleOnChange = (newIndex: number) => {
        handleDropdownChange(indices, currIndex, newIndex, armours, getSelectedArmours, setIndices, setSelectedArmours)
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
        <div>
        <PanelTitle text="Armour" img="icons/armour.png"/>
        <div className="armour-panel">
            {/* div for selecting chest armour */}
            <div>
                {
                    indices.map((i, j) => (
                        <div className="selector" onClick={() => {setCurrIndex(j)}} key={j}>
                            <label>{armourSwitch(j)}</label>
                            <DropDown items={armoursArr[j]} index={indices[j]} isNullable={true} onChange={handleOnChange} hasImages={true} searchEnabled={true}/>
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
                    getSelectedArmours(armours, indices).map(armour => (
                        armour?.effect == null ? "" : 
                        <li key={armour.name}>{armour.effect}</li>
                    ))
                }
                </ul>
            </div>
        </div>
        </div>
    )
}

export default ArmourPanel

