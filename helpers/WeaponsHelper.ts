import { Ash, CharacterStats, Weapon, requiredAttributes } from "@/helpers/types";
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