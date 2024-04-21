import { Armour, CharacterClass, CharacterStats, CrystalTear, GreatRune, Talisman, Weapon } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem";
import { BuildPageContext } from "@/context/BuildPageContext";
import { getTotalStats, isRequiredStatsMet } from "@/helpers/BuildCreatorHelper";
import { useContext } from "react";

interface Props {
    selectedWeapons: Weapon[],
    selectedAffinities: string[],
    selectedAshes: string[],
    selectedLevels: number[],
    selectedClass: CharacterClass,
    characterStats: CharacterStats,
    selectedTalismans: Talisman[],
    selectedArmours: Armour[],
    selectedTears: CrystalTear[],
    greatRune: GreatRune
}

function DisplayWeapons({selectedWeapons, selectedAffinities, selectedAshes, selectedLevels, selectedClass, characterStats, selectedTalismans, selectedArmours, greatRune, selectedTears} : Props) {
    const { physickActivated, runeActivated, twoHanded, setTwoHanded } = useContext(BuildPageContext);
    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, twoHanded, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
    const selectorPanels = [];

    for (let i = 0; i < 2; i++) {
        const condition = (i: number, j:number) => {
            if (i == 0) return j < 3;
            else return j >= 3;
        }

        selectorPanels.push(selectedWeapons.map((weapon, j) => {
            const requirementsMet = isRequiredStatsMet(weapon?.requiredAttributes, totalStats)
        
            return (
                condition(i, j) &&
                <div className="selector" key={j}>
                    <label>{j < 3 ? "Left Armament " + (j % 3 + 1) : "Right Armament " + (j % 3 + 1)}</label>
                    <ListItem image={weapon?.image} text={weapon?.name}/>
                    <div className="requirements-text" data-alt={requirementsMet.reqTitle}>
                        {  
                            requirementsMet.isMet ? "" : 
                            requirementsMet.reqMessage
                        }
                    </div>
                    {
                        <div className="weapon-options">
                            <div style={{width: "fit-content"}}>
                                <label>Ash of War</label>
                                { 
                                    selectedAshes[j] ? 
                                    selectedAshes[j] : 
                                    weapon ?
                                    weapon.defaultSkill :
                                    "-"
                                }
                                </div>
                            <div>
                                <label>Affinity</label>
                                {
                                    weapon ?
                                    selectedAffinities[j] :
                                    "-"
                                }
                            </div>
                            <div>
                                <label>Level</label>
                                {
                                    weapon ?
                                    "+" + selectedLevels[j] :
                                    "-"
                                }
                            </div>
                        </div>
                    }
                    <div className="weapon-effect">{weapon?.effect && "Weapon Effect: " + weapon.effect}</div>
                    <br/>
                </div>
        )}));
    }
    
    return (
        <div>
            <PanelTitle text="Weapons" img="/icons/weapons.png"/>
            <div className="weapons-panel">
                <div className="selectors-container">
                    { selectorPanels[0] } <br/>  
                    <div className="checkbox-container" onClick={() => setTwoHanded(!twoHanded)}>
                        <input type="checkbox" checked={twoHanded} onChange={() => setTwoHanded(!twoHanded)}/>
                        Two-Handed
                    </div>
                </div>
                <div className="selectors-container">
                    { selectorPanels[1] } 
                </div>
            </div>
        </div>

    )
}

export default DisplayWeapons