import { getEquipmentTotalValue } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "../types"

interface Props {
    weapons: Weapon[],
    affinities: string[],
    wepLvls: string[],
    characterClass: CharacterClass,
    characterStats: CharacterStats,
    armours: Armour[],
    talismans: Talisman[]
}

function AttackPowerPanel({weapons, affinities, characterClass, characterStats, armours, talismans}: Props) {
    const totalStats = getTotalStats(characterClass, characterStats, armours, talismans);
    console.log(totalStats);

    return (
    <div>
    </div>
  )
}

export default AttackPowerPanel

function getTotalStats(characterClass: CharacterClass, characterStats: CharacterStats, armours: Armour[], talismans: Talisman[]) {
    const STAT_NAMES = ["vigor", "mind", "endurance", "strength", "dexterity", "intelligence", "faith", "arcane"]
    
    let totalStats: CharacterStats = {
        vigor: 0,
        mind: 0,
        endurance: 0,
        strength: 0,
        dexterity: 0,
        intelligence: 0,
        faith: 0,
        arcane: 0
    }

    STAT_NAMES.forEach((stat, i) => {
        let totalLevel = +characterClass.stats[stat as keyof typeof characterStats] + characterStats[stat as keyof typeof characterStats] + getEquipmentTotalValue(armours, stat) + getEquipmentTotalValue(talismans, stat);
        if (totalLevel > 99) totalLevel = 99;

        totalStats[stat as keyof typeof totalStats] = totalLevel;
    });

    return totalStats;
}

function calculateAttackPower(weapon: Weapon, affinity: string, wepLvl: string, stats: CharacterStats) {
    if (!weapon) return 0;



    var weaponName = weapon.name;
    if (affinity != "Standard") weaponName = affinity + " " + weaponName;
    
}