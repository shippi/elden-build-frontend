'use client'

import { BuildPageContext } from "@/context/BuildPageContext"
import { CrystalTear } from "@/helpers/types";
import { useContext } from "react"
import PanelTitle from "../UIElements/PanelTitle";

interface Props {
    selectedTears: CrystalTear[]
}

function DisplayPhysick({selectedTears} : Props) {
    const { physickActivated, setPhysickActivated } = useContext(BuildPageContext);
    return (
        <div>
            <PanelTitle text="Flask of Wondrous Physick" img="/icons/physick.png"/>
            <div className="physick-panel">
                {
                    selectedTears.map((tear, i) => (
                        <div>
                            <label>Crystal Tear {i+1}</label>
                            <div>{tear ? tear.name : "None"}</div>
                            <br/>
                        </div>
                    ))
                }
                <div className="active-effects">
                <label>Active Effects:</label>
                <ul>
                {
                    selectedTears.map((tear, i) => (
                        tear &&
                        <li key={i}>{i > -1 ? tear.effect.charAt(0).toUpperCase() + tear.effect.slice(1) : ""}</li>
                    ))
                }
                </ul>
                </div>
                <br/>
                <div className={(!selectedTears[0] && !selectedTears[1] ? "disabled " : "") + "checkbox-container"} onClick={() => setPhysickActivated(!physickActivated)}>
                <input type="checkbox" disabled={!selectedTears[0] && !selectedTears[1]} checked={physickActivated} onClick={() => setPhysickActivated(!physickActivated)}/>
                    Activate
                </div>
            </div>
        </div>
    )
}

export default DisplayPhysick