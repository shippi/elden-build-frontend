'use client'
import { DropDown, PanelTitle } from ".."
import { useContext, useEffect, useState } from "react";
import { greatRunes } from "@/public/data";
import BuildCreatorContext from "@/context/BuildCreatorContext";
import { getIndexOfItem } from "@/helpers/BuildCreatorHelper";

function GreatRunesPanel() {
    const {selectedRune, setSelectedRune, runeActivated, setRuneActivated} = useContext(BuildCreatorContext)

    const [index, setIndex] = useState(selectedRune ? getIndexOfItem(selectedRune.name, greatRunes) : -1);
    const disabled = index < 0;

    const handleIndexChange = (i: number) => {
        setIndex(i);
        if (i < 0) setRuneActivated(false);
        setSelectedRune(greatRunes[i]);
    }   

    return (
        <>
        <PanelTitle text={"Great Runes"} img="icons/great-runes.png" />
        <div className="great-runes-panel">
            <DropDown items={greatRunes} index={index} isNullable={true} onChange={handleIndexChange} hasImages={false} />
            <div className="active-effects" style={{marginTop: "15px"}}>
                <label>Passive Effect:</label>
                <ul>
                {index > -1 && <li>{greatRunes[index].description}</li>}
                </ul>
            </div>
            <br/>
            <div className={(disabled ? "disabled " : "") + "checkbox-container"} onClick={() => setRuneActivated(!runeActivated)}>
                <input type="checkbox" checked={runeActivated} disabled={disabled} onClick={() => setRuneActivated(!runeActivated)}/>
                Activate
            </div>
        </div>
        </>
    )
}

export default GreatRunesPanel