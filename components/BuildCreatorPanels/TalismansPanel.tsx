'use client'
import { useContext, useEffect, useState } from "react";
import { DropDown, PanelTitle } from "..";
import { getIndexOfItem, getSelectedItems, handleDropdownChange } from "@/helpers/BuildCreatorHelper";
import { talismans } from "@/public/data";
import BuildCreatorContext from "@/context/BuildCreatorContext";
import { Talisman } from "@/helpers/types";

function TalismansPanel() {
    const {selectedTalismans, setSelectedTalismans} = useContext(BuildCreatorContext);

    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        setIndices(selectedTalismans.map((talisman: Talisman) => { 
            if (talisman) return getIndexOfItem(talisman.name, talismans);
            else return -1;
        }))
    }, [selectedTalismans]);

    const handleOnChange = (newIndex: number) => {
        handleDropdownChange(indices, currIndex, newIndex, talismans, getSelectedItems, setIndices, setSelectedTalismans);
    }

    return (
        <div>
        <PanelTitle text="Talismans" img="icons/talismans.png"/>
        <div className="talismans-panel">
        
            {/* div for selecting talismans*/}
            <div>
                {
                    indices.map((i, j) => (
                        <div className="selector" onClick={() => {setCurrIndex(j)}} key={j}>
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
                        <li className={i > -1 ? "" : "hidden"} key={j}>{i > -1 ? talismans[i].effect : ""}</li>
                    ))
                }
                </ul>
            </div>
        </div>
        </div>
    )
}

export default TalismansPanel

