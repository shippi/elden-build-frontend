'use client'
import { useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel } from '@/components'
import { useFetchAllItems } from '@/hooks';
import { CharacterStats } from '@/components/types';

function BuildCreator() {
    const {classes, armours, talismans, weapons, ashes, affinities, isLoading, error} = useFetchAllItems();
    const [classIndex, setClassIndex] = useState(0);
    const [selectedArmours, setSelectedArmours] = useState(new Array(4).fill(null));
    const [selectedTalismans, setSelectedTalismans] = useState([]);
    const [selectedWeapons, setSelectedWeapons] = useState<any[]>(new Array(6).fill(null));
    const [selectedAshes, setSelectedAshes] = useState<any[]>([]);
    const [selectedWepLvls, setSelectedWepLvls] = useState<any[]>([]);
    const [selectedAffinities, setSelectedAffinities] = useState<any[]>([]);
    
    const [characterStats, setCharacterStats] = useState<CharacterStats>({
        vigor: 0, 
        mind: 0, 
        endurance: 0, 
        strength: 0, 
        dexterity: 0, 
        intelligence: 0, 
        faith: 0, 
        arcane: 0
    });

    const handleWepChange = (weps: any[], ashes: any[], affinities: any[], wepLvls: any[]) => {
        setSelectedWeapons(weps);
        setSelectedAshes(ashes);
        setSelectedAffinities(affinities);
        setSelectedWepLvls(wepLvls);
    };

    if (classes.length > 0 && !isLoading) {
        return (
            <div className="build-creator">
                
                <div className="panels-container">    
                <h1>ELDEN RING BUILD CREATOR</h1>
                    
                    <div className="subcontainer">
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex} onStatChange={setCharacterStats} talismans={selectedTalismans} armours={selectedArmours}/>
                    </div>
                    <div className="subcontainer">
                        <WeaponsPanel weapons={weapons} onWepChange={handleWepChange} ashes={ashes} affinities={affinities} onAffChange={setSelectedAffinities} onAshChange={setSelectedAshes} onLvlChange={setSelectedWepLvls}/>
                        <br/><br/><br/>
                        <div className='subcontainer2'>
                            <ArmourPanel armours={armours} onChange={setSelectedArmours} />
                            <TalismansPanel talismans={talismans} onChange={setSelectedTalismans} />
                        </div>
                    </div>
                    <div className="subcontainer">
                        <StatsPanel characterClass={classes[classIndex]} characterLevelStats={characterStats} armours={selectedArmours} weapons={selectedWeapons} talismans={selectedTalismans} />
                        <br/><br/><br/>
                        <AttackPowerPanel weapons={selectedWeapons} affinities={selectedAffinities} wepLvls={selectedWepLvls} characterClass={classes[classIndex]} characterStats={characterStats} armours={selectedArmours} talismans={selectedTalismans} />
                        <br/><br/><br/>
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