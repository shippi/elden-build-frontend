'use client'
import { Talisman } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem"

interface Props {
    selectedTalismans: Talisman[]
}

function DisplayTalismans({selectedTalismans} : Props) {
    return (
        <div>
        <PanelTitle text="Talismans" img="/icons/talismans.png"/>
        <div className="talismans-panel">
        {
            selectedTalismans.map((talisman: Talisman, i: number) => (
                <div>
                    <label>Talisman {i + 1}</label>
                    <ListItem image={talisman?.image} text={talisman?.name}/>    
                </div>

            ))
        }
        <div className="active-effects">
            <label>Active Effects:</label>
            <ul>
            {
                selectedTalismans.map((talisman: Talisman) => (
                    talisman?.effect == null ? "" : 
                    <li key={talisman.name}>{talisman.effect}</li>
                ))
            }
            </ul>
            </div>
        </div>
        </div>
    )
}

export default DisplayTalismans