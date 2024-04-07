import { Armour } from "@/helpers/types";

/**
 * Used to get the armours that a user has selected based on indices chosen in dropdown.
 * @param armours 
 * @param armourIndices 
 * @returns 
 */
export function getSelectedArmours(armours: Armour[], armourIndices: number[]) {
    // organises each armor category into their own arrays since all armours are in one file
    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Head")),
        [...armours].filter(armour => (armour.category == "Chest")),
        [...armours].filter(armour => (armour.category == "Arms")),
        [...armours].filter(armour => (armour.category == "Legs"))
    ]
    
    let selectedArmours: any[] = [null, null, null, null];
    armourIndices.forEach((i, j) => {
      if (i > -1) selectedArmours[j] = armoursArr[j][i];
    });

    return selectedArmours;
}