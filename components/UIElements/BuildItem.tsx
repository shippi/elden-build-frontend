'use client'

import { useEffect, useState } from "react"

interface Props {
    build: any
}

function BuildItem({ build } : Props) {
    const [creatorName, setCreatorName] = useState("");
    const [viewCount, setViewCount] = useState("");
    const date = new Date(build.updated_at);
    useEffect(() => {
        const getCreatorName = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${build.uid}`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setCreatorName(data[0].username))
            .catch(error => {})
        }
        
        const getViewCount = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `builds/${build.id}/view-count`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setViewCount(data.count))
            .catch(error => {})
        }

        getCreatorName(build);
        getViewCount(build);
    }, []);
    console.log()
    return (
        <div className="build-item">
            <h3>
            {
            build.name.length < 40 ?
            build.name 
            :
            build.name.slice(0, 40) + "..."
            }
            </h3>
            <div style={{display: "flex"}}>
                Created by <div style={{width: "5px"}}/>
                <strong>
                {creatorName}
                </strong>
                , updated on <div style={{width: "5px"}}/>
                {date.toLocaleString().split(",")[0]}
            </div>
            <div className="separator"/>
            <div className="separator"/>
            <div style={{display: "flex", color: "lightgray"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <i className="fa fa-eye fa-lg"/> &nbsp;
                    {viewCount}
                </div>
            </div>
    </div>
  )
}

export default BuildItem