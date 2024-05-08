import { Weapon, CharacterStats, requiredAttributes, Talisman, CrystalTear } from "@/helpers/types";
import { weaponStats, multipliers, calcCorrectGraph, attackElementsCorrect } from "@/public/data";
import { WEAPON_STATS_NAMES } from "./consts";

/**
 * Calculates attack power for a weapon based on this guide:
 * https://docs.google.com/document/d/1WbKxdSTRYTg3NLoOPbsCQzWnU3dxx1i5oR3NldgnQ0o/edit
 * @param weapon 
 * @param affinity 
 * @param wepLvl 
 * @param stats 
 * @returns 
 */
export function calculateAttackPower(weapon: Weapon, affinity: string, wepLvl: number, stats: CharacterStats, talismans?: Talisman[], crystalTears?: CrystalTear[]) {
    if (!weapon) return { finalAttackValues: [0], attackPowerAlt: null, sorceryScaling: 0 };

    var weaponName = weapon.name;
    if (affinity == "Frost") affinity = "Cold";
    if (affinity != "Standard") weaponName = affinity + " " + weaponName;
    
    let baseStats = weaponStats.find(weapon => weapon.name == weaponName);
    if (!baseStats) return { finalAttackValues: [0], attackPowerAlt: null, sorceryScaling: 0 };

    const correctMultId = +baseStats.reinforceType + wepLvl
    const wepMultipliers = multipliers.find(multiplier => multiplier.id == correctMultId.toString())
    
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

    const adjustedBaseValues = [physicalAtk, magicAtk, fireAtk, lightningAtk, holyAtk];
    const adjustedScalingValues = [strengthScaling, dexterityScaling, intellectScaling, faithScaling, arcaneScaling].map(value => +value.toFixed(2));
    
    const attackTypes = ["physical", "magic", "fire", "lightning", "holy"]

    const attackElementId = baseStats?.attackElement;
    const correctGraphIds = baseStats?.calcCorrectIds;
    const weaponReqs = weapon.requiredAttributes;
    
    if (attackElementId && correctGraphIds) {
        let finalAttackValues = [];
        let attackPowerAlt = "Attack Power:"
        let scalingAlt = "\n\nScaling:"
        let sorceryAlt;

        for (let i = 0; i < correctGraphIds.length; i++) {      
            if (weaponReqs && baseValues[i]) {
                
                const bonusAttackTypeValue = calculateBonusAttack(attackElementId, adjustedBaseValues[i], attackTypes[i], adjustedScalingValues, correctGraphIds[i], stats, weaponReqs); 
                const finalAttackTypeValue = calculateFinalAttackValue(adjustedBaseValues[i], bonusAttackTypeValue, attackTypes[i], talismans, crystalTears);
                attackPowerAlt += "\n • " + (attackTypes[i].charAt(0).toUpperCase() + attackTypes[i].slice(1)) + ": " + adjustedBaseValues[i].toFixed(0) + " + (" + Math.floor(finalAttackTypeValue - adjustedBaseValues[i]) + ")"
                finalAttackValues.push(finalAttackTypeValue);
            }
            else {
                attackPowerAlt += "\n • " + (attackTypes[i].charAt(0).toUpperCase() + attackTypes[i].slice(1)) + ": " + adjustedBaseValues[i]
                finalAttackValues.push(0);
            }     

            if (adjustedScalingValues[i] != 0) {
                scalingAlt += "\n • " + (WEAPON_STATS_NAMES[i].charAt(0).toUpperCase() + WEAPON_STATS_NAMES[i].slice(1)) + ": " + getScalingLetter(adjustedScalingValues[i]);
            }
        }

        if (weapon.type == "staff" || weapon.type == "seal") {   
            const sorceryScaling = calculateSorceryScaling(attackElementId, "magic", adjustedScalingValues, correctGraphIds[0], stats, weaponReqs);
            sorceryAlt = "\n\nSpell Scaling: " + Math.floor(sorceryScaling);
            return {finalAttackValues: finalAttackValues, attackPowerAlt: attackPowerAlt + sorceryAlt + scalingAlt, sorceryScaling: sorceryScaling};
        }
        return {finalAttackValues: finalAttackValues, attackPowerAlt: attackPowerAlt + scalingAlt, sorceryScaling: 0};
    }
   
    return { finalAttackValues: [0], attackPowerAlt: null, sorceryScaling: 0};

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

export function calculateBonusAttack(attackElementId: string, baseValue: number, attackType: string, scalingValues: number[], correctGraphId : string, characterStats: CharacterStats, weaponReqs: requiredAttributes) {
    const statTypes = WEAPON_STATS_NAMES.map(name => name.charAt(0).toUpperCase() + name.slice(1));
    const attackElementCorrect = attackElementsCorrect.find(row => row.id == attackElementId);

    let total = 0;
    
    if (attackElementCorrect) {
        for (let i = 0; i < statTypes.length; i++) {
            const currStatType = statTypes[i];
            if (attackElementCorrect[attackType + "ScalesOn" + currStatType as keyof typeof attackElementCorrect] == true) {
                const currReq = weaponReqs[currStatType.toLowerCase() as keyof typeof weaponReqs];
                const currStat = characterStats[currStatType.toLowerCase() as keyof typeof characterStats];

                if (currReq && currStat && currStat < currReq) return baseValue * -0.4;
                else {
                    const statScaling = calculateStatScaling(correctGraphId, currStatType.toLowerCase(), characterStats);
                    const scalingValue = baseValue * (scalingValues[i]/100) * statScaling;
                    total += scalingValue;
                }
            }
        }
    }
    return total;
}

export function calculateSorceryScaling(attackElementId: string, attackType: string, scalingValues: number[], correctGraphId : string, characterStats: CharacterStats, weaponReqs: requiredAttributes) {
    const statTypes = WEAPON_STATS_NAMES.map(name => name.charAt(0).toUpperCase() + name.slice(1));
    const attackElementCorrect = attackElementsCorrect.find(row => row.id == attackElementId);

    let total = 100;
    if (attackElementCorrect) {
        for (let i = 0; i < statTypes.length; i++) {
            const currStatType = statTypes[i];
            if (attackElementCorrect[attackType + "ScalesOn" + currStatType as keyof typeof attackElementCorrect] == true) {
                const currReq = weaponReqs[currStatType.toLowerCase() as keyof typeof weaponReqs];
                const currStat = characterStats[currStatType.toLowerCase() as keyof typeof characterStats];
                    
                if (currReq && currStat && currStat < currReq) return 60;
                else {
                    const statScaling = calculateStatScaling(correctGraphId, currStatType.toLowerCase(), characterStats);
                    const addedValue = (statScaling * 100) * (scalingValues[i]/100);
                    total += addedValue;
                }
            }
        }
    }
    return Math.floor(total);
}

function calculateFinalAttackValue(base: number, bonus: number, type?: string, talismans?: Talisman[], crystalTears? : CrystalTear[]) {
    let finalAttack = base + bonus;
    if (talismans) {
        talismans.forEach(talisman => {
            if (talisman?.statChanges && type + "Dmg" in talisman.statChanges) {
                finalAttack *= talisman.statChanges[type + "Dmg" as keyof typeof talisman.statChanges];
            }
        });
    }
    if (crystalTears) {
        crystalTears.forEach(crystalTear => {
            if (crystalTear?.statChanges && type + "Dmg" in crystalTear.statChanges) {
                finalAttack *= crystalTear.statChanges[type + "Dmg" as keyof typeof crystalTear.statChanges];
            }
        });
    }
    return finalAttack;
}

/**
 * Returns the scaling letter associated with the given value.
 * @param value 
 * @returns 
 */
function getScalingLetter(value: number) {
    if (value < 25) return "E";
    if (value < 60) return "D";
    if (value < 90) return "C";
    if (value < 140) return "B"
    if (value < 175) return "A";
    return "S";
}