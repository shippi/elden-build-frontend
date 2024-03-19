import { Weapon, CharacterStats, requiredAttributes } from "@/app/types";
import { weaponStats, multipliers, calcCorrectGraph, attackElementsCorrect } from "@/public/data";


export function calculateAttackPower(weapon: Weapon, affinity: string, wepLvl: number, stats: CharacterStats) {
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

    const baseValues = [baseStats?.basePhysical, baseStats?.baseMagic, baseStats?.baseFire, baseStats?.baseLightning, baseStats?.baseHoly] 

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
    const adjustedScalingValues = [strengthScaling, dexterityScaling, intellectScaling, faithScaling, arcaneScaling].map(value => +value.toFixed(2));
    
    const attackTypes = ["physical", "magic", "fire", "lightning", "holy"]

    const attackElementId = baseStats?.attackElement;
    const correctGraphIds = baseStats?.calcCorrectIds;
    const weaponReqs = weapon.requiredAttributes;

    if (attackElementId && correctGraphIds) {
        let finalAttackValues = [];
        
            for (let i = 0; i < correctGraphIds.length; i++) {
                
                if (weaponReqs && baseValues[i]) {
                    const finalAttackTypeValue = calculateFinalAttack(attackElementId, adjustedBaseValues[i], attackTypes[i], adjustedScalingValues, correctGraphIds[i], stats, weaponReqs);
                    finalAttackValues.push(finalAttackTypeValue);
                }
                else {
                    finalAttackValues.push(0)
                }
                
            }
        return finalAttackValues;
    }
   
    return [0];

}

export function calculateStatScaling(correctGraphId : string, statType: string, characterStats: CharacterStats) {
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

export function calculateFinalAttack(attackElementId: string, baseValue: number, attackType: string, scalingValues: number[], correctGraphId : string, characterStats: CharacterStats, weaponReqs: requiredAttributes) {
    const statTypes = ["Strength", "Dexterity", "Intelligence", "Faith", "Arcane"];
    const attackElementCorrect = attackElementsCorrect.find(row => row.id == attackElementId);

    let total = baseValue;
    
    if (attackElementCorrect) {
        for (let i = 0; i < statTypes.length; i++) {
            
            const currStatType = statTypes[i];
            if (attackElementCorrect[attackType + "ScalesOn" + currStatType as keyof typeof attackElementCorrect] == true) {
                const currReq = weaponReqs[currStatType.toLowerCase() as keyof typeof weaponReqs];
                const currStat = characterStats[currStatType.toLowerCase() as keyof typeof characterStats];
                if (currReq && currStat && currStat >= currReq) {
                    const statScaling = calculateStatScaling(correctGraphId, currStatType.toLowerCase(), characterStats);
                    const scalingValue = baseValue * (scalingValues[i]/100) * statScaling;
                    total += scalingValue;
                }
                else if (currReq && currStat && currStat < currReq) {
                    
                    const minusValue = baseValue * -0.4;
                    return baseValue + minusValue;
                }  
            }
        }
    }
    return total;
}