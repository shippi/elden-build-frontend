import { getEquipmentTotalValue } from "@/utils/BuildCreatorUtils"
import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "../types"
import { weaponStats } from "@/public/data/WeaponCalculations/weaponStats";
import { multipliers } from "@/public/data/WeaponCalculations/multipliers";
import { calcCorrectGraph } from "@/public/data/WeaponCalculations/calcCorrectGraph";
import { attackElementsCorrect } from "@/public/data/WeaponCalculations/attackElementCorrect";


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
    if (!weapon) return [0];

    var weaponName = weapon.name;
    if (affinity == "Frost") affinity = "Cold";
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

    const adjustedBaseValues = [physicalAtk, magicAtk, fireAtk, lightningAtk, holyAtk]
    const adjustScalingValues = [strengthScaling, dexterityScaling, intellectScaling, faithScaling, arcaneScaling].map(value => +value.toFixed(2));
    
    const attackTypes = ["physical", "magic", "fire", "lightning", "holy"]

    const attackElementId = baseStats?.attackElement;
    const correctGraphIds = baseStats?.calcCorrectIds;

    if (attackElementId && correctGraphIds) {
        let finalAttackValues = [];
        
            for (let i = 0; i < correctGraphIds.length; i++) {
                const finalAttackTypeValue = calculateFinalAttack(attackElementId, adjustedBaseValues[i], attackTypes[i], adjustScalingValues, correctGraphIds[i], stats)
                finalAttackValues.push(finalAttackTypeValue);
            }
        
        return finalAttackValues;
    }
   
    return [0];

}

function calculateStatScaling(correctGraphId : string, statType: string, characterStats: CharacterStats) {
    const correctGraph = calcCorrectGraph.find(row => row.id == correctGraphId);
    const statValue = characterStats[statType as keyof typeof characterStats];

    if (correctGraph) {
        let minIndex = 0;
        let maxIndex = 0;

        for (let i = 0; i < correctGraph.stats.length; i++) {
            if (statValue > correctGraph.stats[i]) minIndex = i;
            else if (statValue <= correctGraph.stats[i]) {
                maxIndex = i;
                break;
            }
        }

        const statMin = correctGraph.stats[minIndex];
        const statMax = correctGraph.stats[maxIndex];
        const exponent = correctGraph.exponents[minIndex%2];
        const growthMin = correctGraph.growths[minIndex];
        const growthMax = correctGraph.growths[maxIndex];

        const ratio = (statValue - statMin) / (statMax - statMin);

        let growth = 0;
        if (exponent > 0) 
            growth = ratio ** exponent
        else if (exponent < 0)
            growth = 1 - ((1 - ratio) ** Math.abs(exponent))

        const output = (growthMin + (growthMax - growthMin) * growth) / 100;

        return output;
    }

    return 0;
}

function calculateFinalAttack(attackElementId: string, baseValue: number, attackType: string, scalingValues: number[], correctGraphId : string, characterStats: CharacterStats) {
    const statTypes = ["Strength", "Dexterity", "Intelligence", "Faith", "Arcane"];
    const attackElementCorrect = attackElementsCorrect.find(row => row.id == attackElementId);

    let total = baseValue;

    if (attackElementCorrect) {
        for (let i = 0; i < statTypes.length; i++) {
            const currStatType = statTypes[i]
            if (attackElementCorrect[attackType + "ScalesOn" + currStatType as keyof typeof attackElementCorrect] == true) {
                const statScaling = calculateStatScaling(correctGraphId, currStatType.toLowerCase(), characterStats);
                const scalingValue = baseValue * (scalingValues[i]/100) * statScaling;
                total += scalingValue;
            }
        }
    }
    
    return total;
}