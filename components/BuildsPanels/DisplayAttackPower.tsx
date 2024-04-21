import { BuildPageContext } from "@/context/BuildPageContext";
import { calculateAttackPower } from "@/helpers/AttackPowerPanelHelper";
import { getTotalStats } from "@/helpers/BuildCreatorHelper";
import { Armour, CharacterClass, CharacterStats, CrystalTear, GreatRune, Talisman, Weapon } from "@/helpers/types"
import { useContext } from "react";
import PanelTitle from "../UIElements/PanelTitle";

interface Props {
    selectedWeapons: Weapon[],
    selectedAffinities: string[],
    selectedLevels: number[],
    selectedClass: CharacterClass,
    characterStats: CharacterStats,
    selectedTalismans: Talisman[],
    selectedArmours: Armour[],
    selectedTears: CrystalTear[],
    greatRune: GreatRune
}

function DisplayAttackPower({selectedWeapons, selectedAffinities, selectedLevels, selectedClass, characterStats, selectedTalismans, selectedArmours, greatRune, selectedTears} : Props) {
    const { physickActivated, runeActivated, twoHanded } = useContext(BuildPageContext);
    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, twoHanded, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
    return (
        <div>
        <PanelTitle text="Attack Power/Spell Scaling" img="/icons/attack-power.png"/>
        
        <div className="attack-power-panel">
            {
                selectedWeapons.map((weapon: Weapon, i: number) => {
                    const attackPower = calculateAttackPower(weapon, selectedAffinities[i], selectedLevels[i], totalStats)
                    return (
                        <div key={i}>
                            <span className="attack-power" data-alt={attackPower.attackPowerAlt}>
                            {(i < 3 ? "L Armament " : "R Armament ") + (i % 3 + 1)}
                            </span>
                            {
                                Math.floor(
                                    attackPower
                                    .finalAttackValues
                                    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                                )
                            } 
                            {
                                ["staff", "seal"].includes(weapon?.type) && " / " + attackPower.sorceryScaling
                            }
                        </div>
                )})
            }
        </div>
        </div>
      )
}

export default DisplayAttackPower