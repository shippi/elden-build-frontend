import { CharacterClass, CharacterStats, Armour, Talisman, GreatRune, requiredAttributes } from "@/helpers/types";
import { MAX_STAT_LEVEL, STAT_NAMES, WEAPON_STATS_NAMES } from "./consts";

export function getSelectedItems(items: any[], indices: number[]) {
    let selectedItems: any[] = new Array(indices.length).fill(null);

    indices.forEach((i, j) => {
      if (i > -1) {
        selectedItems[j] = items[i];
      }
    });

    return selectedItems;
}

export function getIndexOfItem(name: string, items: any[]) {
    return items.findIndex(item => item.name == name);
}

export function getItemFromName(name: string, items: any[]) {
  return items.find(item => item.name == name);
}

export function getIndicesOfItems(selectedItems: any[], items: any[]) {
  return selectedItems.map((item) => { 
    if (item) return getIndexOfItem(item.name, items);
    else return -1;
  })
}

export function calculateStatLevel(classLevel: number, levelStat: number, talismanLevels?: number[], armourLevels?: number[], greatRuneLevel?: number) {
  let totalLevel = classLevel + levelStat;

  talismanLevels?.forEach(level => {
    if (level) totalLevel += level;
  });

  armourLevels?.forEach(level => {
    if (level) totalLevel += level;
  })

  if (greatRuneLevel) totalLevel += greatRuneLevel;
  if (totalLevel > MAX_STAT_LEVEL) return MAX_STAT_LEVEL;
  else return totalLevel;
}

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

export function getRuneValue(type: string, greatRune?: GreatRune) {
  if (greatRune?.statChanges) {
    return greatRune.statChanges[type.toLowerCase() as keyof typeof greatRune.statChanges] || 0;
  }
  return 0;
}

export function getTotalStats(characterClass: CharacterClass, characterStats: CharacterStats, armours: Armour[], talismans: Talisman[], twoHanded: boolean, greatRune?: GreatRune) {
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
      if (greatRune && greatRune.statChanges) totalLevel += greatRune.statChanges[stat as keyof typeof greatRune.statChanges] || 0;

      if (totalLevel > 99) totalLevel = 99;
      if (twoHanded && stat == "strength") totalLevel *= 1.5;
      totalStats[stat as keyof typeof totalStats] = totalLevel;
  });
  
  return totalStats;
}

export function calculateTotalLevel(totalStats: CharacterStats) {
  let level = 0;
  STAT_NAMES.forEach((name, i) => {
    level += totalStats[name as keyof typeof totalStats]
  })
  return level - 79;
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

export function handleDropdownChange(indices: number[], currIndex: number, newIndex: number, items: any[], getSelected: Function, setIndices: Function, onChange?: Function) {
  let newIndices = [...indices];
  newIndices[currIndex] = newIndex;

  const selectedItems = getSelected(items, newIndices);

  setIndices(newIndices);
  if (onChange) onChange(selectedItems);
}