import { CharacterClass, CharacterStats, Armour, Talisman, GreatRune, requiredAttributes, CrystalTear } from "@/helpers/types";
import { MAX_STAT_LEVEL, STAT_NAMES, WEAPON_STATS_NAMES } from "./consts";

/**
 * Returns the index of an item in an array if the name matches.
 * @param name 
 * @param items 
 * @returns 
 */
export function getIndexOfItem(name: string, items: any[]) {
  return items.findIndex(item => item.name == name);
}

/**
 * Returns an item from an array if the name matches.
 * @param name 
 * @param items 
 * @returns 
 */
export function getItemFromName(name: string, items: any[]) {
  return items.find(item => item.name == name);
}

/**
 * Takes an array of items and returns array of the indices for those items.
 * @param selectedItems 
 * @param items 
 * @param start 
 * @returns 
 */
export function getIndicesOfItems(selectedItems: any[], items: any[], start?: number) {
  return selectedItems.map((item) => { 
    if (item) return getIndexOfItem(item.name, items);
    else return start ? start : -1;
  })
}

/**
 * Returns an array of items based on an array of indices.
 * @param items 
 * @param indices 
 * @returns 
 */
export function getSelectedItems(items: any[], indices: number[]) {
    let selectedItems: any[] = new Array(indices.length).fill(null);

    indices.forEach((i, j) => {
      if (i > -1) {
        selectedItems[j] = items[i];
      }
    });

    return selectedItems;
}

/**
 * Calculates and returns total level based on values of total stats.
 * @param totalStats 
 * @returns 
 */
export function calculateTotalLevel(totalStats: CharacterStats) {
  let level = 0;
  STAT_NAMES.forEach((name, i) => {
    level += totalStats[name as keyof typeof totalStats]
  })
  return level - 79;
}

/**
 * Calculates and return total points for a particular stat, based on points from 
 * starting class, added points, talismans, armours and great rune.
 * @param classLevel 
 * @param levelStat 
 * @param talismanLevels 
 * @param armourLevels 
 * @param greatRuneLevel 
 * @returns 
 */
export function calculateStatLevel(classLevel: number, levelStat: number, talismanLevels?: number[], armourLevels?: number[], greatRuneLevel?: number, tearLevels?: number[]) {
  let totalLevel = classLevel + levelStat;

  talismanLevels?.forEach(level => {
    if (level) totalLevel += level;
  });

  armourLevels?.forEach(level => {
    if (level) totalLevel += level;
  })

  tearLevels?.forEach(level => {
    if (level) totalLevel += level;
  })

  if (greatRuneLevel) totalLevel += greatRuneLevel;
  if (totalLevel > MAX_STAT_LEVEL) return MAX_STAT_LEVEL; // level for a stat caps at 99
  else return totalLevel;
}

/**
 * Returns an array of added values for a particular stat that comes from
 * an array of selected type of equipment (e.g. talismans, armours)
 * @param selectedEquipment 
 * @param type 
 * @returns 
 */
export function getEquipmentValues(selectedEquipment: any[], type: string) {
  let itemValues: number[] = [];

  selectedEquipment.forEach(item => {
      if (item?.statChanges?.hasOwnProperty(type.toLowerCase())) {
          let itemValue = item.statChanges[type.toLowerCase() as keyof typeof item.statChanges];
          if (itemValue != null)
              itemValues.push(+itemValue);
      }
  });

  return itemValues;
}

/**
 * Returns the total value for a particular stat that comes from
 * an array of selected type of equipment (e.g. talismans, armours)
 * @param selectedEquipment 
 * @param type 
 * @returns 
 */
export function getEquipmentTotalValue(selectedEquipment: any[], type: string) {
  let value = 0;

  selectedEquipment.forEach(item => {
    if (item?.statChanges?.hasOwnProperty(type.toLowerCase())) {
        let itemValue = item.statChanges[type.toLowerCase() as keyof typeof item.statChanges];
        if (itemValue != null) value += +itemValue;
    }
  });

  return value;
}

/**
 * Gets the value for a particular stat that comes from selected Great Rune
 * @param type 
 * @param greatRune 
 * @returns 
 */
export function getRuneValue(type: string, greatRune?: GreatRune) {
  if (greatRune?.statChanges) {
    return greatRune.statChanges[type.toLowerCase() as keyof typeof greatRune.statChanges] || 0;
  }
  return 0;
}

/**
 * Gets total stats based on starting class, added points, armours, talismans, 
 * great rune, and if two-handed is enabled or not.
 * @param characterClass 
 * @param characterStats 
 * @param armours 
 * @param talismans 
 * @param twoHanded 
 * @param greatRune 
 * @returns 
 */
export function getTotalStats(characterClass: CharacterClass, characterStats: CharacterStats, armours: Armour[], talismans: Talisman[], twoHanded: boolean, greatRune?: GreatRune, tears?: CrystalTear[]) {
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

  STAT_NAMES.forEach(stat => {
      let totalLevel = +characterClass.stats[stat as keyof typeof characterStats] + characterStats[stat as keyof typeof characterStats] + getEquipmentTotalValue(armours, stat) + getEquipmentTotalValue(talismans, stat);
      if (tears) totalLevel += getEquipmentTotalValue(tears, stat);

      if (greatRune && greatRune.statChanges) totalLevel += greatRune.statChanges[stat as keyof typeof greatRune.statChanges] || 0;

      if (totalLevel > 99) totalLevel = 99;
      if (twoHanded && stat == "strength") totalLevel *= 1.5;
      totalStats[stat as keyof typeof totalStats] = totalLevel;
  });
  
  return totalStats;
}



/**
 * Returns an object that contains if the total character stats meet the 
 * requirement for a weapon and a string listing the requirements.
 * @param weapon 
 * @param totalStats 
 * @returns 
 */
export function isRequiredStatsMet(requirements: requiredAttributes, totalStats: CharacterStats, twoHanded?: boolean) {
  if (requirements == undefined) return {isMet: false, reqMessage: null};

  let isMet = true;
  let requirementsMessage = "Requirements: "
  let requirementsTitle = "Requirements:"

  // loops through each of the names for the stats used for weapon scaling
  // since the same stats are used for weapon requirements
  WEAPON_STATS_NAMES.forEach(stat => {
      let currReq = requirements[stat as keyof typeof requirements];
      const currStat = totalStats[stat as keyof typeof totalStats];
      
      if (currReq && currStat < currReq) isMet = false;

      if (currReq) {
          
          if (stat == "strength" && twoHanded) {
              currReq = currReq / 1.5;
          }
          requirementsMessage += currReq.toFixed(0) + "/";
          requirementsTitle += "\n • " + (stat.charAt(0).toUpperCase() + stat.slice(1)) + ": " + currReq.toFixed(0);
          
      }
      else  {
          requirementsMessage += "0/";
          requirementsTitle += "\n • " + (stat.charAt(0).toUpperCase() + stat.slice(1)) + ": " + "0";
      }
  });

  return { isMet: isMet, reqMessage: requirementsMessage.slice(0, -1), reqTitle: requirementsTitle};
}

/**
 * Function used to handle when a new item is selected in many of the dropdown menus,
 * particularly for choosing equipment.
 * @param indices 
 * @param currIndex 
 * @param newIndex 
 * @param items 
 * @param getSelected 
 * @param setIndices 
 * @param onChange 
 */
export function handleDropdownChange(indices: number[], currIndex: number, newIndex: number, items: any[], getSelected: Function, setIndices: Function, onChange?: Function) {
  let newIndices = [...indices];
  newIndices[currIndex] = newIndex;

  const selectedItems = getSelected(items, newIndices);

  setIndices(newIndices);
  if (onChange) onChange(selectedItems);
}