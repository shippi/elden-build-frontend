import { getTotalStats } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "@/utils/types"
import { calculateAttackPower } from "@/utils/AttackPowerUtils";
import { PanelTitle } from "..";

interface Props {
    weapons: Weapon[],
    affinities: string[],
    wepLvls: number[],
    characterClass: CharacterClass,
    characterStats: CharacterStats,
    armours: Armour[],
    talismans: Talisman[],
    twoHanded: boolean
}

function AttackPowerPanel({weapons, affinities, wepLvls, characterClass, characterStats, twoHanded, armours, talismans}: Props) {
    const totalStats = getTotalStats(characterClass, characterStats, armours, talismans, twoHanded);

    return (
    <>
    <PanelTitle text="Attack Power" img="icons/attack-power.png"/>
    
    <div className="attack-power-panel">
        {
            weapons.map((weapon, i) => (
                <div>
                    <span className="attack-power" data-alt={calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats).attackPowerAlt}>
                    {(i < 3 ? "L Armament " : "R Armament ") + (i % 3 + 1)}
                    </span>
                    {
                        Math.floor(
                            calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats)
                            .finalAttackValues
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                        )
                    } 
                </div>
            ))
        }
    </div>
    </>
  )
}

export default AttackPowerPanel