import { CharacterClass, CharacterStats, Talisman, Armour, Weapon, GreatRune } from "@/utils/types";
import { getEquipmentValues, getRuneValue } from "./BuildCreatorUtils";

/**
 * Calculates the total HP value based on total vigor level, and talismans and armour effects.
 * All calculations, including further functions are based directly on how it is done in-game.
 * @param characterClass 
 * @param characterLevelStats 
 * @param talismans 
 * @param armours 
 * @returns 
 */
export function calculateHP(vigorLevel: number, talismans: Talisman[], armours: Armour[], greatRune?: GreatRune) {
    // if-else block to determine base hp from vigor. Certain level cutoffs use different type of scaling
    let hp = 0;
    if (vigorLevel < 26) {
      hp = 300 + 500*(((vigorLevel-1)/24)**1.5);
    }
    else if (vigorLevel < 41) {
      hp = 800 + 650*(((vigorLevel-25)/15)**1.1);
    }
    else if (vigorLevel < 61) {
      hp = 1450 + 450*(1 - (1 - ((vigorLevel - 40)/20))**1.2);
    }
    else {
      hp = 1900 + 200*(1 - (1 - ((vigorLevel - 60)/39))**1.2);
    }
  
    hp = Math.floor(hp); 
  
    // applies effects from talismans and armours. These effects affect the max hp rather than vigor level.
    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.maxHp != null) hp *= talisman.statChanges.maxHp;
    });
    armours.forEach(armour => {
        if (armour && armour.statChanges?.maxHp != null) hp *= armour.statChanges.maxHp;
    });
    
    if (greatRune?.statChanges?.maxHp) hp *= greatRune.statChanges.maxHp;

    return Math.floor(hp);
  }
  
  /**
   * Calculates the total FP value based on total mind level, and talismans and armour effects.
   * Entirely different function is made due to different level cutoffs and scaling compared to calculateHP function.
   * @param characterClass 
   * @param characterLevelStats 
   * @param talismans 
   * @param armours 
   * @returns 
   */
  export function calculateFP(mindLevel: number, talismans: Talisman[], armours: Armour[], greatRune?: GreatRune) {
    let fp = 0;
    if (mindLevel < 16) {
      fp = 50 + 45*((mindLevel - 1)/14);
    }
    else if (mindLevel < 36) {
      fp = 95 + 105*((mindLevel - 15)/20);
    }
    else if (mindLevel < 61) {
      fp = 200 + 150*(1 - (1 - ((mindLevel - 35)/25)**1.2));
    }
    else {
      fp = 350 + 100*((mindLevel - 60)/39);
    }
  
    fp = Math.floor(fp);
  
    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.maxFp != null) fp *= talisman.statChanges.maxFp;
    });
    armours.forEach(armour => {
        if (armour && armour.statChanges?.maxFp != null) fp *= armour.statChanges.maxFp;
    });

    if (greatRune?.statChanges?.maxFp) fp *= greatRune.statChanges.maxFp;

    return Math.floor(fp);
  }

  /**
   * Calculates the total stamina value based on total endurance level, and talismans and armour effects.
   * @param characterClass 
   * @param characterLevelStats 
   * @param talismans 
   * @param armours 
   * @returns 
   */
  export function calculateStamina(enduranceLevel: number, talismans: Talisman[], armours: Armour[], greatRune?: GreatRune) {
    let stamina = 0;
    if (enduranceLevel < 16) {
      stamina = 80 + 25*((enduranceLevel - 1)/14);
    }
    else if (enduranceLevel < 36) {
      stamina = 105 + 25*((enduranceLevel - 15)/15);
    }
    else if (enduranceLevel < 61) {
      stamina = 130 + 25*((enduranceLevel - 30)/20);
    }
    else {
      stamina = 155 + 15*((enduranceLevel - 50)/49);
    }
  
    stamina = Math.floor(stamina);
  
    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.maxStamina != null) stamina *= talisman.statChanges.maxStamina;
    });
    armours.forEach(armour => {
        if (armour && armour.statChanges?.maxStamina != null) stamina *= armour.statChanges.maxStamina;
    });

    if (greatRune?.statChanges?.maxStamina) stamina *= greatRune.statChanges.maxStamina;

    return Math.floor(stamina);
  }
  
  /**
   * Calculates the max equip load value based on total endurance level, and talismans effects.
   * Does not take into account armour effects, since no armour exists that affects max equip load.
   * Uses same stat used for stamina, but has entirely different level cut offs and scaling.
   * @param characterClass 
   * @param characterLevelStats 
   * @param talismans 
   * @returns 
   */
  export function calculateEquipLoad(enduranceLevel: number, talismans: Talisman[], greatRune?: GreatRune) {
    let equipLoad = 0;
    
    if (enduranceLevel < 26) equipLoad = 45 + 27*((enduranceLevel - 8)/17);
    else if (enduranceLevel < 61) equipLoad = 72 + 48*(((enduranceLevel - 25)/35)**1.1);
    else equipLoad = 120 + 40*((enduranceLevel - 60)/39);

    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.maxEquipLoad != null) equipLoad *= talisman.statChanges.maxEquipLoad;
    });
  
    return equipLoad;
  }
  
  /**
   * Calculates the sum of weights for selected armours, talismans and weapons.
   * These equipment types are the only ones that affect weight.
   * @param armours 
   * @param talismans 
   * @param weapons 
   * @returns 
   */
  export function calculateWeight(armours: Armour[], talismans: Talisman[], weapons: Weapon[]) {
    let totalWeight = 0;
  
    armours.forEach(armour => {
      if (armour != null) totalWeight += armour.weight;
    });
  
    weapons.forEach(weapon => {
      if (weapon != null) totalWeight += weapon.weight;
    });
  
    talismans.forEach(talisman => {
      if(talisman != null) totalWeight += talisman.weight;
    });
  
    return totalWeight;
  }
  
  /**
   * Calculates total poise based on armour and talismans.
   * @param armours 
   * @param talismans 
   * @returns 
   */
  export function calculatePoise(armours: Armour[], talismans: Talisman[]) {
    let poise = 0;
  
    armours.forEach(armour => {
      if (armour != null) poise += armour.poise;
    });
    
    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.maxPoise != null) poise *= talisman.statChanges.maxPoise;
    });
  
    return Math.floor(poise);
  }
  
/**
 * Calculates total discovery based on total stats and talisman effects.
 * @param totalStats 
 * @param talismans 
 * @param armours 
 * @param greatRune 
 * @returns 
 */
  export function calculateDiscovery(arcaneLevel: number, talismans: Talisman[], armours: Armour[], greatRune?: GreatRune) {
    let discovery = 100;
  
    talismans.forEach(talisman => {
      if (talisman && talisman.statChanges?.discovery != null) discovery += talisman.statChanges.discovery;
    });
    
    if (greatRune?.statChanges?.arcane) discovery += greatRune.statChanges.arcane;

    return discovery + arcaneLevel
  }
  
  /**
   * Calculates weight ratio and its associated status.
   * @param weight
   * @param maxEquipLoad 
   * @returns 
   */
  export function getWeightRatio(weight: number, maxEquipLoad: number) {
    const ratio = weight / maxEquipLoad;
  
    if (ratio <= 0.299) return "Light Load";
    if (ratio <= 0.699) return "Med. Load";
    if (ratio <= 0.999) return "Heavy Load";
    return "Overloaded";
  }