import { getEquipmentTotalValue } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "../types"
import { weaponStats } from "@/public/data/WeaponCalculations/weaponStats";
import { multipliers } from "@/public/data/WeaponCalculations/multipliers";
import { calcCorrectGraph } from "@/public/data/WeaponCalculations/calcCorrectGraph";


interface Props {
    weapons: Weapon[],
    affinities: string[],
    wepLvls: number[],
    characterClass: CharacterClass,
    characterStats: CharacterStats,
    armours: Armour[],
    talismans: Talisman[]
}

function AttackPowerPanel({weapons, affinities, wepLvls, characterClass, characterStats, armours, talismans}: Props) {
    const totalStats = getTotalStats(characterClass, characterStats, armours, talismans);
    calculateAttackPower(weapons[0], affinities[0], wepLvls[0], totalStats)

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

function calculateAttackPower(weapon: Weapon, affinity: string, wepLvl: number, stats: CharacterStats) {
    if (!weapon) return 0;

    var weaponName = weapon.name;
    if (affinity != "Standard") weaponName = affinity + " " + weaponName;
    
    let baseStats = weaponStats.find(weapon => weapon.name == weaponName);
    let wepMultipliers;

    if (baseStats) {
        const correctMultId = +baseStats.reinforceType + wepLvl
        wepMultipliers = multipliers.find(multiplier => multiplier.id == correctMultId.toString())
    }

    let physicalAtk = 0;
    let magicAtk = 0;
    let fireAtk = 0;
    let lightningAtk = 0;
    let holyAtk = 0;
    let strengthScaling = 0;
    let dexterityScaling = 0;
    let intellectScaling = 0;
    let faithScaling = 0;
    let arcaneScaling = 0;

    if (wepMultipliers && baseStats) {
        physicalAtk = baseStats.basePhysical * wepMultipliers.physicalAtk;
        magicAtk = baseStats.baseMagic * wepMultipliers.magicAtk;
        fireAtk = baseStats.baseFire * wepMultipliers.fireAtk;
        lightningAtk = baseStats.baseLightning * wepMultipliers.lightningAtk;
        holyAtk = baseStats.baseHoly * wepMultipliers.holyAtk;
        strengthScaling = baseStats.strengthScaling * wepMultipliers.strengthScaling
        dexterityScaling = baseStats.dexterityScaling * wepMultipliers.dexterityScaling
        intellectScaling = baseStats.intellectScaling * wepMultipliers.intellectScaling
        faithScaling = baseStats.faithScaling * wepMultipliers.faithScaling
        arcaneScaling = baseStats.arcaneScaling * wepMultipliers.arcaneScaling
    }

    const adjustBaseStats = [physicalAtk, magicAtk, fireAtk, lightningAtk, holyAtk, strengthScaling, dexterityScaling, intellectScaling, faithScaling, arcaneScaling].map(value => +value.toFixed(2));
    
    
}