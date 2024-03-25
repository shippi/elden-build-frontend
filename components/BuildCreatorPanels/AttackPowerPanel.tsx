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
            weapons.map((weapon, i) => {
                const attackPower = calculateAttackPower(weapon, affinities[i], wepLvls[i], totalStats)
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
    </>
  )
}

export default AttackPowerPanel