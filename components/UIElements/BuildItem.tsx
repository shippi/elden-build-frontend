'use client'

import { useEffect, useState } from "react"

interface Props {
    build: any
}

function BuildItem({ build } : Props) {
    const [creatorName, setCreatorName] = useState("")
    const date = new Date(build.updated_at);
    useEffect(() => {
        const getCreatorName = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${build?.uid}`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setCreatorName(data[0].username))
            .catch(error => {})
        }
        getCreatorName(build);
    }, []);

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
    </div>
  )
}

export default BuildItem