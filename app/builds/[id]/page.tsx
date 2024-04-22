'use client'

import { BuildPage, Loading, NotFound } from "@/components";
import { AuthContext } from "@/context/AuthContext"
import { BuildPageContextProvider } from "@/context/BuildPageContext";
import { useContext, useEffect, useState } from "react"

interface Props {
    params: {
      id: string
    }
}

function Build({params: {id}}: Props) {
    const { currentUser } = useContext(AuthContext);

    const [creatorName, setCreatorName] = useState("");
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
    }, [currentUser]);

    useEffect(() => {
        const getCreatorName = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${build.uid}`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json()
            }) 
            .then(data => setCreatorName(data[0].username))
            .catch(error => setBuild(null))
        }
        if (build) {
            getCreatorName();
            setTimeout(() => setLoading(false), 600);
        }
        else {
            setTimeout(() => setLoading(false), 2100);
        }
    }, [build]);



    return (
        loading ? <Loading coverScreen={true}/>
        :
        !build && !loading ? <NotFound message="Build does not exist or it may be private."/>
        :
        <>
            <BuildPageContextProvider>
            <BuildPage creatorName={creatorName} name={build.name} description={build.description} build={build.build}/>
            </BuildPageContextProvider>
        </>
        
    )
}

export default Build