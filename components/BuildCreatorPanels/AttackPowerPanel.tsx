import { getTotalStats } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, GreatRune, Talisman, Weapon } from "@/utils/types"
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
    twoHanded: boolean, 
    greatRune?: GreatRune
}

function AttackPowerPanel({weapons, affinities, wepLvls, characterClass, characterStats, twoHanded, armours, talismans, greatRune}: Props) {
    const totalStats = getTotalStats(characterClass, characterStats, armours, talismans, twoHanded, greatRune);

    return (
    <>
    <PanelTitle text="Attack Power/Spell Scaling" img="icons/attack-power.png"/>
    
    <div className="attack-power-panel">
        {
            weapons.map((weapon, i) => (
                <div>
                    <span className="attack-power" data-alt={calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats).attackPowerAlt}>
                    {(i < 3 ? "L Armament " : "R Armament ") + (i % 3 + 1)}
                    </span>
                    {
                        weapon?.type != "staff" && weapon?.type != "seal" ? 
                        Math.floor(
                            calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats)
                            .finalAttackValues
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                        ):
                        Math.floor(
                            calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats)
                            .sorceryScaling
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