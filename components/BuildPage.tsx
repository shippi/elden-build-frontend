'use client'
import { Build } from "@/helpers/types"
import { DisplayArmours } from "."
import { getItemFromName } from "@/helpers/BuildCreatorHelper"
import { armours, talismans } from "@/public/data"
import DisplayTalismans from "./BuildsPanels/DisplayTalismans"

interface Props {
    name: string,
    creatorName: string,
    build: any
}

function BuildPage({ name, creatorName, build } : Props) {
    const selectedArmours = build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedTalismans = build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    
    return (
        <div className="build-page">
            <div style={{height: "40px"}}></div>
            <div className="header">
                <h1>{name}</h1> 
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
                <div>Created by <span>{creatorName}</span></div>
            </div>
            <div style={{height: "20px", width:"100%"}}/>
            <DisplayArmours selectedArmours={selectedArmours} />
            <DisplayTalismans selectedTalismans={selectedTalismans} />
        </div>
    )
}

export default BuildPage