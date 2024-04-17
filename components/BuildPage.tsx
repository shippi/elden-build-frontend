'use client'
import { Build } from "@/helpers/types"
import { DisplayArmours } from "."

interface Props {
    name: string,
    creatorName: string,
    build: any
}

function BuildPage({ name, creatorName, build } : Props) {
    return (
        <div className="build-page">
            <div style={{height: "40px"}}></div>
            <div className="header">
                <h1>{name}</h1> 
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
                <div>Created by <span>{creatorName}</span></div>
            </div>
            <div style={{height: "20px", width:"100%"}}/>
            <DisplayArmours selectedArmours={build.selectedArmours} />

        </div>
    )
}

export default BuildPage