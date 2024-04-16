'use client'

import { Loading, NotFound } from "@/components";
import { AuthContext } from "@/context/AuthContext"
import { delay } from "@/utils";
import { useContext, useEffect, useState } from "react"

interface Props {
    params: {
      id: string
    }
}

function Build({params: {id}}: Props) {
    const { currentUser } = useContext(AuthContext);
    const [build, setBuild] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBuild = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `builds/${id}`, {
                method: "GET",
                headers: {
                  "Authorization" : `Bearer ${currentUser?.accessToken}` 
                }
            })
            .then(res => {
                if (!res.ok) throw Error;
                return res.json()
            }) 
            .then(data => setBuild(data))
            .catch(error => setBuild(null))
            
        }
        getBuild();
        setTimeout(() => setLoading(false), 750)
        
    }, [])
    
    return (
        loading ? <Loading coverScreen={true}/>
        :
        !build ? <NotFound message="Build does not exist or it may be private."/>
        :
        <div>
            {build.uid}
        </div>
    )
}

export default Build