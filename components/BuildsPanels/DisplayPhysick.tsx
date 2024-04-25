'use client'

import { BuildPageContext } from "@/context/BuildPageContext"
import { CrystalTear } from "@/helpers/types";
import { useContext } from "react"
import PanelTitle from "../UIElements/PanelTitle";
import Link from "next/link";

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
                        <div key={i}>
                            <label>Crystal Tear {i+1}</label>
                            <div>
                            <Link href={process.env.NEXT_PUBLIC_WIKI_URL + tear?.name} target="_blank">{tear ? tear.name : "None"}</Link>
                            </div>
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
                <input type="checkbox" disabled={!selectedTears[0] && !selectedTears[1]} checked={physickActivated} onChange={() => setPhysickActivated(!physickActivated)}/>
                    Activate
                </div>
            </div>
        </div>
    )
}

export default DisplayPhysick