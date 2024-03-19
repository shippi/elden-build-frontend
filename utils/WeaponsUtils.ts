import { Ash, CharacterStats, Weapon } from "@/utils/types";

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
 * Returns the index of the given name for an Ash of War
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
export function getSelectedAshes(weps: Weapon[], ashes: Ash[], ashIndices: number[]) {
    let selectedAshes = new Array(weps.length).fill(null);

    weps.forEach((wep, i) => {
        if (wep && !wep.unique) { // checks if weapon exists and whether if it's unique
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
export function isRequiredStatsMet(weapon: Weapon, totalStats: CharacterStats) {
    if (weapon == undefined) return {isMet: false, reqMessage: null}; // base case for if weapon is undefined

    let isMet = true;
    let reqMessage = "Requirements: "

    // loops through each of the names of the stats that can be used to scale weapons
    WEAPON_STATS_NAMES.forEach(stat => {
        // gets the weapon requirement for that stat, and the stat value in total character stats
        const wepReq = weapon.requiredAttributes[stat as keyof typeof weapon.requiredAttributes];
        const currStat = totalStats[stat as keyof typeof totalStats];
        
        // if even one of the stat requirements are not satisfied, then isMet flag is set to false
        if (wepReq && currStat < wepReq) isMet = false;

        // builds the string for the requirements as loop progresses
        if (wepReq) reqMessage += wepReq + "/";
        else  reqMessage += "0/";
    });

    return { isMet: isMet, reqMessage: reqMessage.slice(0, -1)};
}