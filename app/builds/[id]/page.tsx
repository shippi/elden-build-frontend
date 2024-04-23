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
        const getCreatorName = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${build?.uid}`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setCreatorName(data[0].username))
            .catch(error => {})
        }

        const addView = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `view-counts`, {
                method: "POST",
                body: JSON.stringify({
                    build_id: id,
                    user_id: currentUser?.uid
                })
            })
            .catch();
        }

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
                    setBuild(data);
                    getCreatorName(data);
                    addView();
                }
            })
            .catch(error => {})
            .finally(() => {
                setLoading(false);
            })
        }

        const timeout = setTimeout(() => {
            getBuild();
        }, 1000);
      
        return () => clearTimeout(timeout);
    }, [currentUser]);



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