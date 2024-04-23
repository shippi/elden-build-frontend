'use client'
import { DisplayAmmo, DisplayArmours, DisplayAttackPower, DisplayCharacter, DisplayDefenses, DisplaySpells, DisplayStats, DisplayWeapons } from "."
import { getItemFromName } from "@/helpers/BuildCreatorHelper"
import { armours, arrows, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data"
import DisplayTalismans from "./BuildsPanels/DisplayTalismans"
import DisplayGreatRune from "./BuildsPanels/DisplayGreatRune"
import DisplayPhysick from "./BuildsPanels/DisplayPhysick"
import { crystalTears } from "@/public/data/Equipment/crystalTears"

interface Props {
    name: string,
    description: string,
    creatorName: string,
    build: any
}

function BuildPage({ name, description, creatorName, build } : Props) {
    const selectedClass = getItemFromName(build.selectedClass, classes);
    const selectedArmours = build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedTalismans = build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    const selectedWeapons = build.selectedWeapons.map((weapon: string) => getItemFromName(weapon, weapons));
    const selectedAffinities = build.selectedAffinities;
    const selectedAshes = build.selectedAshes;
    const selectedWepLvls = build.selectedWepLvls;
    const selectedRune = getItemFromName(build.selectedRune, greatRunes);
    const selectedTears = build.selectedTears.map((tear: string) => getItemFromName(tear, crystalTears));
    const characterStats = build.characterStats;
    const selectedArrows = build.selectedArrows.map((arrow: string) => getItemFromName(arrow, arrows));
    const selectedBolts = build.selectedBolts.map((bolt: string) => getItemFromName(bolt, bolts));
    const selectedSpells = build.selectedSpells.map((spell: string) => getItemFromName(spell, spells));
    
    return (
        <>
        <div style={{height: "40px"}}></div>
       
        <div className="build-page">
            <div className="panels-container">
            <div className="header">
                <h1>{name}</h1> 
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
                <div>Created by <span style={{color:"gold"}}>{creatorName}</span></div>
            </div>
            
            </div>
            
            {
                
            }
            <div className="panels-container">
                {
                    description &&
                    <div>
                        <div style={{height:"15px"}}/>
                        <div className="description">{description}</div>
                    </div>
                }
                <div className="separator" style={{width: "100%"}}/>
            </div>
            
            <div className="panels-container">
                <div className="subcontainer">
                    <DisplayCharacter 
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}           
                    />
                    <DisplayGreatRune 
                        selectedRune={selectedRune}
                    />
                    <DisplayPhysick 
                        selectedTears={selectedTears}
                    />
                </div>
                <div className="subcontainer">
                    <DisplayWeapons 
                        selectedWeapons={selectedWeapons} 
                        selectedAffinities={selectedAffinities} 
                        selectedAshes={selectedAshes} 
                        selectedLevels={selectedWepLvls}   
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}                      
                    />
                    <div className="subcontainer2">
                        <DisplayArmours selectedArmours={selectedArmours} />
                        <DisplayTalismans selectedTalismans={selectedTalismans} />
                    </div>
                </div>

                <div className="subcontainer">
                    <DisplayStats
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}     
                        selectedWeapons={selectedWeapons}      
                    />
                    <DisplayAttackPower 
                        selectedWeapons={selectedWeapons} 
                        selectedAffinities={selectedAffinities} 
                        selectedLevels={selectedWepLvls}   
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}     
                    />
                    <DisplayDefenses 
                        selectedClass={selectedClass}
                        characterStats={characterStats}
                        selectedTalismans={selectedTalismans}
                        selectedArmours={selectedArmours}
                        greatRune={selectedRune}
                        selectedTears={selectedTears}                   
                    />
                </div>
                <div className="separator" style={{width: "100%"}}/>
                <div className="bottom-panels-container">
                    <DisplayAmmo selectedArrows={selectedArrows} selectedBolts={selectedBolts}/>
                    
                    <div style={{width:"3vw"}}/>
                    <DisplaySpells 
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune}
                        selectedTears={selectedTears} 
                        selectedSpells={selectedSpells}
                    />
                </div>
                
            </div>
            <div style={{height:"5vw"}}/>
        </div>
        </>
    )
}

export default BuildPage