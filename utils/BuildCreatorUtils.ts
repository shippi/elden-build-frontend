import { CharacterClass, CharacterStats, Armour, Talisman } from "@/app/types";

export function getSelectedItems(items: any[], indices: number[]) {
    let selectedItems: any[] = new Array(indices.length).fill(null);

    indices.forEach((i, j) => {
      if (i > -1) {
        selectedItems[j] = items[i];
      }
     
    });

    return selectedItems;
}

export function calculateLevel(classLevel: number, levelStat: number, talismanLevels?: number[], armourLevels?: number[]) {
  let totalLevel = classLevel + levelStat;

  talismanLevels?.forEach(level => {
    if (level) totalLevel += level;
  });

  armourLevels?.forEach(level => {
    if (level) totalLevel += level;
  })

  if (totalLevel > 99) return 99;
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
        if (itemValue != null)
            value += +itemValue;
    }
  });

  return value;
}
export function getTotalStats(characterClass: CharacterClass, characterStats: CharacterStats, armours: Armour[], talismans: Talisman[], twoHanded: boolean) {
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
      if (twoHanded && stat == "strength") totalLevel *= 1.5;
      totalStats[stat as keyof typeof totalStats] = totalLevel;
  });
  
  return totalStats;
}