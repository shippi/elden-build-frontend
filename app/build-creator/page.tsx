'use client'
import { useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel } from '@/components'
import { useFetchAllItems } from '@/hooks';
import { Ash, Weapon } from '@/components/types';

function BuildCreator() {
    const {classes, armours, talismans, weapons, ashes, affinities, isLoading, error} = useFetchAllItems();
    const [classIndex, setClassIndex] = useState(0);
    const [selectedArmours, setSelectedArmours] = useState([]);
    const [selectedTalismans, setSelectedTalismans] = useState([]);
    const [selectedWeapons, setSelectedWeapons] = useState<any[]>([]);
    const [selectedAshes, setSelectedAshes] = useState<any[]>([]);
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

    const handleWepChange = (weps: any[], ashes: any[]) => {
        setSelectedWeapons(weps)
        setSelectedAshes(ashes)
    }

    if (classes.length > 0 && !isLoading) {
        return (
            <div className="build-creator">
                    <h1>ELDEN RING BUILD CREATOR</h1>
                <div className="panels-container">    
                    <br />
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex} onStatChange={setCharacterStats} talismans={selectedTalismans} armours={selectedArmours}/>
                    <ArmourPanel armours={armours} onChange={setSelectedArmours} />
                    <TalismansPanel talismans={talismans} onChange={setSelectedTalismans} />
                    <WeaponsPanel weapons={weapons} onChange={handleWepChange} ashes={ashes} affinities={affinities}/>
                    <div>
                    <StatsPanel characterClass={classes[classIndex]} characterLevelStats={characterStats} armours={selectedArmours} weapons={selectedWeapons} talismans={selectedTalismans} />
                    <DefencesPanel characterClass={classes[classIndex]} characterLevelStats={characterStats} armours={selectedArmours} talismans={selectedTalismans} />
                    </div>
                    
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