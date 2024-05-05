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
    const [buildData, setBuildData] = useState<any>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
		document.title =  `Elden Builder - View Builds`
	}, []);
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
            .then(data => {
                if (data) {
                    setBuildData(data);
                }
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false);
            })
        }
        
        setLoading(true);
        const timeout = setTimeout(() => {
            getBuild();
        }, 600);
      
        return () => clearTimeout(timeout);
    }, [currentUser]);

    return (
        loading ? <Loading coverScreen={true}/>
        :
        !buildData && !loading ? <NotFound message="Build does not exist or it may be private."/>
        :
        <>
            <BuildPageContextProvider>
                <BuildPage buildData={buildData}/>
            </BuildPageContextProvider>
        </>
        
    )
}

export default Build