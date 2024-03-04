'use client'
import { useState } from 'react'
import { ArmourPanel, CharacterPanel, Loading } from '@/components'
import { useFetchAllItems } from '@/hooks';
import TalismansPanel from '@/components/TalismansPanel';

function BuildCreator() {
    const {classes, armours, talismans, isLoading, error} = useFetchAllItems();
    const [classIndex, setClassIndex] = useState(0);
    const [armourIndices, setArmourIndices] = useState({
        helm: -1,
        chest: -1,
        gauntlets: -1,
        legs: -1
    });
    const [talismanIndices, setTalismanIndices] = useState([-1, -1, -1, -1]);
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
                    <h1>ELDEN RING BUILD CREATOR</h1>
                <div className="panels-container">    
                    <br />
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex} onStatChange={setCharacterStats}/>
                    <ArmourPanel armours={armours} indices={armourIndices} onChange={setArmourIndices} />
                    <TalismansPanel talismans={talismans} indices={talismanIndices} onChange={setTalismanIndices} />
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