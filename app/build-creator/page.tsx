'use client'
import { useState } from 'react'
import { CharacterPanel, Loading } from '@/components'
import { useFetchAllItems } from '@/hooks';

function BuildCreator() {
    const {classes, isLoading, error} = useFetchAllItems();
    const [classIndex, setClassIndex] = useState(0);

    const [characterStats, setCharacterStats] = useState({
        vigor: 0, 
        mind: 0, 
        endurance: 0, 
        strength: 0, 
        dexterity: 0, 
        intelligence: 0, 
        faith: 0, 
        arcane: 0
    });

    if (classes.length > 0 && !isLoading) {
        return (
            <div className="build-creator">
                <div className="panels-container">
                    <h1>ELDEN RING BUILD CREATOR</h1>
                    <br />
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex} onStatChange={setCharacterStats}/>
                </div>     
            </div>
        )
    }
    else {
        return (
            <Loading />
        )
    }
}

export default BuildCreator