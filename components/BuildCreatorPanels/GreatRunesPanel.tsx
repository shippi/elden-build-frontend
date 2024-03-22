'use client'
import { GreatRune } from "@/utils/types"
import { DropDown, PanelTitle } from ".."
import { useState } from "react";

interface Props {
    greatRunes: GreatRune[],
    index: number,
    onIndexChange: Function,
    onActivateChange: Function
}

function GreatRunesPanel({greatRunes, index, onIndexChange, onActivateChange} : Props) {
    const [activated, setActivated] = useState(false);
    const disabled = index < 0;

    const handleCheckboxChange = () => {
        setActivated(!activated);
        onActivateChange(!activated);
    }

    const handleIndexChange = (i: number) => {
        onIndexChange(i);
        if (i < 0) {
            setActivated(false);
            onActivateChange(false);
        }
    }   

    return (
        <>
        <PanelTitle text={"Great Runes"} img="icons/great-runes.png" />
        <div className="great-runes-panel">
            
            <DropDown items={greatRunes} index={index} isNullable={true} onChange={handleIndexChange} hasImages={false} />

            <div className="active-effects" >
                <label>Passive Effect:</label>
                <ul>
                {index > -1 && <li>{greatRunes[index].description}</li>}
                </ul>
            </div>
            <br/>
            <div className={(disabled ? "disabled " : "") + "checkbox-container"} onClick={handleCheckboxChange}>
                <input type="checkbox" checked={activated} disabled={disabled}/>
                Activate
            </div>
        </div>
        </>
    )
}

export default GreatRunesPanel