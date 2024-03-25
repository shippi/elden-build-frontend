'use client'
import { useEffect, useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel } from '@/components'
import { CharacterStats } from '@/utils/types';
import { getTotalStats } from '@/utils/BuildCreatorUtils';
import { classes, greatRunes } from '@/public/data';

function BuildCreator() {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedArmours, setSelectedArmours] = useState(new Array(4).fill(null));
    const [selectedTalismans, setSelectedTalismans] = useState([]);
    const [selectedWeapons, setSelectedWeapons] = useState<any[]>(new Array(6).fill(null));
    const [selectedAshes, setSelectedAshes] = useState<any[]>([]);
    const [selectedWepLvls, setSelectedWepLvls] = useState<any[]>([]);
    const [selectedAffinities, setSelectedAffinities] = useState<any[]>([]);
    const [greatRuneIndex, setGreatRuneIndex] = useState(-1);
    const [selectedArrows, setSelectedArrows] = useState<any[]>([]);
    const [selectedBolts, setSelectedBolts] = useState<any[]>([]);
    const [selectedSpells, setSelectedSpells] = useState<any[]>([]);
    
    const [twoHanded, setTwoHanded] = useState(false);
    const [runeActivated, setRuneActivated] = useState(false);

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

    const [totalStats, setTotalStats] = useState<CharacterStats>({
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
    

    if (selectedClass) {
        return (
            <div className="build-creator">
                
                <div className="panels-container">    
                <h1>ELDEN RING BUILD CREATOR</h1>
                    <div className="subcontainer">
                    <CharacterPanel 
                        onChange={setSelectedClass} 
                        onStatChange={setCharacterStats} 
                        talismans={selectedTalismans} 
                        armours={selectedArmours} 
                        greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined}
                    />
                    <div style={{height:"40px"}}/>
                    <GreatRunesPanel greatRunes={greatRunes} index={greatRuneIndex} onIndexChange={setGreatRuneIndex} onActivateChange={setRuneActivated} />
                    
                    </div>
                    <div className="subcontainer">
                        <WeaponsPanel
                            characterClass={selectedClass} 
                            characterStats={characterStats}
                            armours={selectedArmours} 
                            talismans={selectedTalismans}
                            greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined}
                            onWepChange={handleWepChange}
                            onAffChange={setSelectedAffinities}
                            onAshChange={setSelectedAshes}
                            onLvlChange={setSelectedWepLvls}
                            onTwoHandChange={setTwoHanded}                             
                        />
                        <div style={{height:"40px"}}/>
                        <div className='subcontainer2'>
                            <ArmourPanel onChange={setSelectedArmours}/>
                            <TalismansPanel onChange={setSelectedTalismans}/>
                        </div>
                    </div>
                    <div className="subcontainer" >
                        <StatsPanel 
                            characterClass={selectedClass} 
                            characterLevelStats={characterStats} 
                            armours={selectedArmours} 
                            weapons={selectedWeapons} 
                            talismans={selectedTalismans} 
                            greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined}/>
                        <div style={{height:"40px"}}/>
                        <AttackPowerPanel 
                            weapons={selectedWeapons} 
                            affinities={selectedAffinities} 
                            wepLvls={selectedWepLvls} 
                            characterClass={selectedClass} 
                            characterStats={characterStats} 
                            armours={selectedArmours} 
                            talismans={selectedTalismans} 
                            twoHanded={twoHanded} 
                            greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined}/>
                        <div style={{height:"40px"}}/>
                        <DefencesPanel 
                            characterClass={selectedClass} 
                            characterLevelStats={characterStats} 
                            armours={selectedArmours} 
                            talismans={selectedTalismans}
                            greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined}/>
                    </div>  

                </div>
                <div className="separator" />
                <div className="bottom-panels-container">
                    <AmmoPanel onArrowsChange={setSelectedArrows} onBoltsChange={setSelectedBolts}/>
                    <div style={{width:"3vw"}}/>
                    <SpellsPanel 
                        characterClass={selectedClass} 
                        characterStats={characterStats} 
                        armours={selectedArmours} 
                        talismans={selectedTalismans} 
                        greatRune={runeActivated ? greatRunes[greatRuneIndex] : undefined} 
                        onChange={setSelectedSpells}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <Loading/>
        )
    }
}

export default BuildCreator