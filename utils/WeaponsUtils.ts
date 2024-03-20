import { Ash, CharacterStats, Weapon } from "@/utils/types";
import { WEAPON_STATS_NAMES } from "./consts";

/**
 * Returns the available ashes of war that can be used for the weapon type.
 * @param ashes 
 * @param wepType 
 * @returns 
 */
export function getAvailableAshes(ashes: Ash[], wepType: string) {
    return ashes.filter(ash => ash.availability[wepType as keyof typeof ash.availability] == true);
}

/**
 * Returns the index of the given name for an Ash of War.
 * @param ashes 
 * @param ashName 
 * @returns 
 */
export function getAshIndex(ashes: Ash[], ashName: string) {
    let index = 0;
    ashes.forEach((ash, i) => {
        if (ash.name == ashName) index = i
    })
    return index;
}

/**
 * Returns the selected Ash of War for each selected weapon.
 * @param weps 
 * @param ashes 
 * @param ashIndices 
 * @returns 
 */
export function getSelectedAshes(selectedWeapons: Weapon[], ashes: Ash[], ashIndices: number[]) {
    let selectedAshes = new Array(selectedWeapons.length).fill(null);

    selectedWeapons.forEach((wep, i) => {
        if (wep && !wep.unique) {
            selectedAshes[i] = getAvailableAshes(ashes, wep.type)[ashIndices[i]]
        }
    })

    return selectedAshes;
}

/**
 * Returns an object that contains if the total character stats meet the 
 * requirement for a weapon and a string listing the requirements.
 * @param weapon 
 * @param totalStats 
 * @returns 
 */
export function isRequiredStatsMet(weapon: Weapon, totalStats: CharacterStats, twoHanded?: boolean) {
    if (weapon == undefined) return {isMet: false, reqMessage: null};

    let isMet = true;
    let requirementsMessage = "Requirements: "
    let requirementsTitle = "Weapon Requirements:"

    // loops through each of the names for the stats used for weapon scaling
    // since the same stats are used for weapon requirements
    WEAPON_STATS_NAMES.forEach(stat => {
        let wepReq = weapon.requiredAttributes[stat as keyof typeof weapon.requiredAttributes];
        const currStat = totalStats[stat as keyof typeof totalStats];
        
        if (wepReq && currStat < wepReq) isMet = false;

        if (wepReq) {
            
            if (stat == "strength" && twoHanded) {
                console.log(stat)
                wepReq = wepReq / 1.5;
            }
            requirementsMessage += wepReq + "/";
            requirementsTitle += "\n • " + (stat.charAt(0).toUpperCase() + stat.slice(1)) + ": " + wepReq;
        }
        else  {
            requirementsMessage += "0/";
            requirementsTitle += "\n • " + (stat.charAt(0).toUpperCase() + stat.slice(1)) + ": " + "0";
        }
    });

    return { isMet: isMet, reqMessage: requirementsMessage.slice(0, -1), reqTitle: requirementsTitle};
}