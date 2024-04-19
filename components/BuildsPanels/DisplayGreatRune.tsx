'use client'

import { GreatRune } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import { useContext } from "react"
import { BuildPageContext } from "@/context/BuildPageContext"

interface Props {
    selectedRune: GreatRune
}

function DisplayGreatRune({selectedRune} : Props) {
    const { runeActivated, setRuneActivated } = useContext(BuildPageContext);
    return (
        <div>
        <PanelTitle text={"Great Rune"} img="/icons/great-runes.png" />
        <div className="great-runes-panel">
            {selectedRune ? selectedRune.name : "None"}
            <div className="active-effects" style={{marginTop: "15px"}}>
                <label>Passive Effect:</label>
                <ul>
                {selectedRune && <li>{selectedRune?.description}</li>}
                </ul>
            </div>
            <br/>
            <div className={(!selectedRune ? "disabled " : "") + "checkbox-container"} onClick={() => setRuneActivated(!runeActivated)}>
                <input type="checkbox" disabled={!selectedRune} checked={runeActivated} onClick={() => setRuneActivated(!runeActivated)}/>
                Activate
            </div>
        </div>
        </div>
  )
}

export default DisplayGreatRune