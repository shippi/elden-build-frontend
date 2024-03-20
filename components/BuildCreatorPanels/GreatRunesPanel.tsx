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

    const handleCheckboxChange = () => {
        setActivated(!activated);
        onActivateChange(!activated);
    }

    return (
        <>
        <PanelTitle text={"Great Runes"} img="icons/great-runes.png" />
        <div className="great-runes-panel">
            
            <DropDown items={greatRunes} index={index} isNullable={true} onChange={onIndexChange} hasImages={false} />

            <div className="active-effects">
                <label>Effect:</label>
                <ul>
                {index > -1 && <li>{greatRunes[index].description}</li>}
                </ul>
            </div>
            <br/>
            <div className="checkbox-container" onClick={handleCheckboxChange}>
                <input type="checkbox" checked={activated}/>
                Activate
            </div>
        </div>
        </>
    )
}

export default GreatRunesPanel