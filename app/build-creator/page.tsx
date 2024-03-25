'use client'
import { useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel } from '@/components'
import { CharacterStats } from '@/utils/types';
import { classes } from '@/public/data';
import { BuildCreatorContext, BuildCreatorContextProvider } from '@/context/BuildCreatorContext';

function BuildCreator() {
    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedArmours, setSelectedArmours] = useState(new Array(4).fill(null));
    const [selectedTalismans, setSelectedTalismans] = useState([]);
    const [selectedWeapons, setSelectedWeapons] = useState<any[]>(new Array(6).fill(null));
    const [selectedAshes, setSelectedAshes] = useState<any[]>([]);
    const [selectedWepLvls, setSelectedWepLvls] = useState<any[]>([]);
    const [selectedAffinities, setSelectedAffinities] = useState<any[]>([]);
    const [selectedRune, setSelectedRune] = useState(undefined);
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

    const handleWepChange = (weps: any[], ashes: any[], affinities: any[], wepLvls: any[]) => {
        setSelectedWeapons(weps);
        setSelectedAshes(ashes);
        setSelectedAffinities(affinities);
        setSelectedWepLvls(wepLvls);
    };
    

    if (selectedClass) {
        return (
            <div className="build-creator">
                <BuildCreatorContextProvider>
                <div className="panels-container">    
                <h1>ELDEN RING BUILD CREATOR</h1>
                    <div className="subcontainer">
                    <CharacterPanel/>
                    <div style={{height:"40px"}}/>
                    <GreatRunesPanel/>
                    </div>
                    <div className="subcontainer">
                        <WeaponsPanel/>
                        <div style={{height:"40px"}}/>
                        <div className='subcontainer2'>
                            <ArmourPanel/>
                            <TalismansPanel/>
                        </div>
                    </div>
                    <div className="subcontainer" >
                        <StatsPanel/>
                        <div style={{height:"40px"}}/>
                        <AttackPowerPanel/>
                        <div style={{height:"40px"}}/>
                        <DefencesPanel/>
                    </div>  

                </div>
                <div className="separator" />
                <div className="bottom-panels-container">
                    <AmmoPanel/>
                    <div style={{width:"3vw"}}/>
                    <SpellsPanel/>
                </div>
                </BuildCreatorContextProvider>
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