import { getTotalStats } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "@/app/types"
import { calculateAttackPower } from "@/utils/AttackPowerUtils";

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
    <div className="attack-power-panel">

        {
            weapons.map((weapon, i) => (
                <div>
                    <strong>
                    {(i < 3 ? "L Armament " : "R Armament ") + (i % 3 + 1)}
                    </strong>
                    {
                        Math.floor(
                            calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats)
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                        )
                    } 
                </div>
            ))
        }
    </div>
  )
}

export default AttackPowerPanel