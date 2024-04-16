'use client'
import { Build } from "@/helpers/types"

interface Props {
    name: string,
    creatorName: string,
    build: Build
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
        </div>
    )
}

export default BuildPage