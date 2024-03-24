'use client'
import { useEffect, useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel } from '@/components'
import { useFetchAllItems } from '@/hooks';
import { CharacterStats } from '@/utils/types';
import { getTotalStats } from '@/utils/BuildCreatorUtils';

function BuildCreator() {
    const {classes, armours, talismans, weapons, ashes, affinities, greatRunes, arrows, bolts, spells, isLoading, error} = useFetchAllItems();
    const [classIndex, setClassIndex] = useState(0);
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
    

    if (classes.length > 0 && !isLoading) {
        return (
            <div className="build-creator">
                
                <div className="panels-container">    
                <h1>ELDEN RING BUILD CREATOR</h1>
                    <div className="subcontainer">
                    <CharacterPanel 
                        classes={classes} 
                        index={classIndex} 
                        onChange={setClassIndex} 
                        onStatChange={setCharacterStats} 
                        talismans={selectedTalismans} 
                        armours={selectedArmours} 
                        greatRune={runeActivated && greatRunes[greatRuneIndex]}
                    />
                    <div style={{height:"40px"}}/>
                    <GreatRunesPanel greatRunes={greatRunes} index={greatRuneIndex} onIndexChange={setGreatRuneIndex} onActivateChange={setRuneActivated} />
                    
                    </div>
                    <div className="subcontainer">
                        <WeaponsPanel 
                            weapons={weapons}
                            ashes={ashes}
                            affinities={affinities}
                            characterClass={classes[classIndex]} 
                            characterStats={characterStats}
                            armours={selectedArmours} 
                            talismans={selectedTalismans}
                            greatRune={runeActivated && greatRunes[greatRuneIndex]}
                            onWepChange={handleWepChange}
                            onAffChange={setSelectedAffinities}
                            onAshChange={setSelectedAshes}
                            onLvlChange={setSelectedWepLvls}
                            onTwoHandChange={setTwoHanded}                             
                        />
                        <div style={{height:"40px"}}/>
                        <div className='subcontainer2'>
                            <ArmourPanel armours={armours} onChange={setSelectedArmours}/>
                            <TalismansPanel talismans={talismans} onChange={setSelectedTalismans}/>
                        </div>
                    </div>
                    <div className="subcontainer" >
                        <StatsPanel 
                            characterClass={classes[classIndex]} 
                            characterLevelStats={characterStats} 
                            armours={selectedArmours} 
                            weapons={selectedWeapons} 
                            talismans={selectedTalismans} 
                            greatRune={runeActivated && greatRunes[greatRuneIndex]}/>
                        <div style={{height:"40px"}}/>
                        <AttackPowerPanel 
                            weapons={selectedWeapons} 
                            affinities={selectedAffinities} 
                            wepLvls={selectedWepLvls} 
                            characterClass={classes[classIndex]} 
                            characterStats={characterStats} 
                            armours={selectedArmours} 
                            talismans={selectedTalismans} 
                            twoHanded={twoHanded} 
                            greatRune={runeActivated && greatRunes[greatRuneIndex]}/>
                        <div style={{height:"40px"}}/>
                        <DefencesPanel 
                            characterClass={classes[classIndex]} 
                            characterLevelStats={characterStats} 
                            armours={selectedArmours} 
                            talismans={selectedTalismans}
                            greatRune={runeActivated && greatRunes[greatRuneIndex]}/>
                    </div>  

                </div>
                <div className="separator" />
                <div className="bottom-panels-container">
                    <AmmoPanel arrows={arrows} bolts={bolts} onArrowsChange={setSelectedArrows} onBoltsChange={setSelectedBolts}/>
                    <div style={{width:"3vw"}}/>
                    <SpellsPanel 
                        spells={spells} 
                        characterClass={classes[classIndex]} 
                        characterStats={characterStats} 
                        armours={selectedArmours} 
                        talismans={selectedTalismans} 
                        greatRune={runeActivated && greatRunes[greatRuneIndex]} 
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