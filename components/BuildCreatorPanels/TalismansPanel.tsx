'use client'
import { useState } from "react";
import { DropDown, PanelTitle } from "..";
import { getSelectedItems, handleDropdownChange } from "@/utils/BuildCreatorUtils";
import { Talisman } from "../../utils/types";

interface Props {
    talismans: Talisman[],
    onChange: Function
}

function TalismansPanel({talismans, onChange} : Props) {
    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const [currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        handleDropdownChange(indices, currIndex, newIndex, talismans, getSelectedItems, setIndices, onChange)
    }

    return (
        <div>
        <PanelTitle text="Talismans" img="icons/talismans.png"/>
        <div className="talismans-panel">
        
            {/* div for selecting talismans*/}
            <div>
                {
                    indices.map((i, j) => (
                        <div className="selector" onClick={() => {setCurrIndex(j)}}>
                            <label>Talisman {j+1} </label>
                            <DropDown items={talismans} index={indices[j]} isNullable={true} incompatibilities={indices} hasImages={true} scrollPage={true} onChange={handleOnChange} searchEnabled={true}/>
                        </div>
                    ))
                }
            </div>
            <br/>
            <div className="active-effects">
                <label>Active Effects:</label>
                <ul>
                {
                    indices.map((i, j) => (
                        <li className={i > -1 ? "" : "hidden"}>{i > -1 ? talismans[i].effect : ""}</li>
                    ))
                }
                </ul>
            </div>
        </div>
        </div>
    )
}

export default TalismansPanel

