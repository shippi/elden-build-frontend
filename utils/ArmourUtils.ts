import { Armour } from "@/app/types";

/**
 * Used to get the armours that a user has selected based on indices chosen in dropdown.
 * @param armours 
 * @param armourIndices 
 * @returns 
 */
export function getSelectedArmours(armours: Armour[], armourIndices: number[]) {
    // organises each armor category into their own arrays
    const armoursArr = [
        [...armours].filter(armour => (armour.category == "Head")),
        [...armours].filter(armour => (armour.category == "Chest")),
        [...armours].filter(armour => (armour.category == "Arms")),
        [...armours].filter(armour => (armour.category == "Legs"))
    ]
    
    let selectedArmours: any[] = [null, null, null, null];

    // goes through each value in armourIndices to grab armour from armoursArr
    armourIndices.forEach((i, j) => {
      if (i > -1) { // checks if index/value is -1, if so leaves value as null
        selectedArmours[j] = armoursArr[j][i];
      }
     
    });
    return selectedArmours;
}