'use client'
import { useState } from "react";
import { DropDown } from "..";
import { getSelectedItems } from "@/utils/BuildCreatorUtils";
import { Talisman } from "../../utils/types";

interface Props {
    talismans: Talisman[],
    onChange: Function
}

function TalismansPanel({talismans, onChange} : Props) {
    const [indices, setIndices] = useState([-1, -1, -1, -1]);
    const [currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        let newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;

        const selectedTalismans = getSelectedItems(talismans, newIndeces);

        setIndices(newIndeces);
        onChange(selectedTalismans);
    }

    return (
        <div className="talismans-panel">
            {/* div for selecting talismans*/}
            <div>
                {
                    indices.map((i, j) => (
                        <div className="selector" onClick={() => {setCurrIndex(j)}}>
                            <label>Talisman {j+1} </label>
                            <DropDown items={talismans} index={indices[j]} isNullable={true} incompatibilities={indices}  hasImages={true} scrollPage={true} onChange={handleOnChange}/>
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
    )
}

export default TalismansPanel

