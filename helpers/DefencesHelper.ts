import { CharacterStats, Armour, Talisman, CrystalTear } from "@/helpers/types";
import { NEGATION_NAMES } from "./consts";

/**
 * Calculates and returns physical defences (physical, strike, slash and pierce) based
 * on total level and strength level.
 * @param totalStats 
 * @param level 
 * @returns 
 */
export function calculatePhysicalDefences(totalStats: CharacterStats, level: number) {
    const strengthLevel = totalStats.strength;
    let baseStat = 0;
      
    // calculates defense number based on given level
    if (level < 72) {
      baseStat = 40 + 60*((level + 78) / 149);
    }
    else if (level < 92) {
      baseStat = 100 + 20*((level - 71) / 20);
    }
    else if (level < 162) {
      baseStat = 120 + 15*((level - 91) / 70);
    }
    else {
      baseStat = 135 + 20*((level - 161) / 552);
    }
  
    // adds to defense based on level of strength
    if (strengthLevel < 31) {
      baseStat += 10*(strengthLevel / 30);
    }
    else if (strengthLevel < 41) {
      baseStat += 10 + 5*((strengthLevel-30) / 10);
    }
    else if (strengthLevel < 61) {
      baseStat += 15 + 15*((strengthLevel - 40) / 20);
    }
    else {
      baseStat += 30 + 10*((strengthLevel - 60) / 39);
    }
  
    let physical = baseStat;
    let strike = baseStat;
    let slash = baseStat;
    let pierce = baseStat;
  
    return [physical, strike, slash, pierce].map(i => Math.floor(i));
  }
  
  /**
   * Calculates and returns negation values based on selected armours and talismans.
   * @param selectedArmours 
   * @param selectedTalismans 
   * @returns 
   */
  export function calculateNegations(selectedArmours: Armour[], selectedTalismans: Talisman[], selectedTears?: CrystalTear[]) {
    let negationValues = [0, 0, 0, 0, 0, 0, 0, 0]; // initialize all negation values as 0
  
    // loops through each of the selected armours and calculates the new negation value
    selectedArmours.forEach((armour) => {
      if (armour != null) {
        NEGATION_NAMES.forEach((name, i) => {
          // damage negation calculation is not linear and additive, and has reducing effectiveness the higher the value
          negationValues[i] = negationValues[i] - ((negationValues[i] * armour.dmgNegation[name as keyof typeof armour.dmgNegation])/100) + armour.dmgNegation[name as keyof typeof armour.dmgNegation];
        })
      }
    })
    
    // loops through each of the armours again, but checks for special effects that affect damage negation and adds it
    selectedArmours.forEach((armour) => {
      if (armour != null) {
        NEGATION_NAMES.forEach((name, i) => {
          if (armour.statChanges?.hasOwnProperty(name += "Negation")) {
            let armourValue = armour.statChanges[name as keyof typeof armour.statChanges]
            if (armourValue != undefined)
              negationValues[i] = negationValues[i] - ((negationValues[i] * armourValue)/100) + armourValue;
          }
        })
      }
    })
    
    // loops through each of the selected talismans and calculates the new negation value.
    // uses the same calculation formula as armours.
    selectedTalismans.forEach(talisman => {
      if (talisman != null) {
        NEGATION_NAMES.forEach((name, i) => {
          if (talisman.statChanges?.hasOwnProperty(name += "Negation")) {
            let talismanValue = talisman.statChanges[name as keyof typeof talisman.statChanges];
            if (talismanValue != undefined) 
              negationValues[i] = negationValues[i]- ((negationValues[i] *  talismanValue) / 100) + talismanValue;
          }
        });
      }
    });

    if (!selectedTears) return negationValues;

    selectedTears.forEach(tear => {
      if (tear != null) {
        NEGATION_NAMES.forEach((name, i) => {
          if (tear.statChanges?.hasOwnProperty(name += "Negation")) {
            let tearValue = tear.statChanges[name as keyof typeof tear.statChanges];
            if (tearValue != undefined) 
              negationValues[i] = negationValues[i]- ((negationValues[i] *  tearValue) / 100) + tearValue;
          }
        });
      }
    });

    return negationValues;
  }
  
  /**
   * Calculates and returns the values for magic defences (magic, fire, lightning and holy),
   * based on total level, intelligence, vigor, arcane, armours, and talismans.
   * @param totalStats 
   * @param level 
   * @returns 
   */
  export function calculateMagicDefences(totalStats: CharacterStats, level: number) {
    const intelligenceLevel = totalStats.intelligence;
    const vigorLevel = totalStats.vigor;
    const arcaneLevel = totalStats.arcane;
  
    let baseStat = 0;
  
    // calculates base defense number based on given level
    if (level < 72) {
      baseStat = 40 + 60*((level + 78) / 149);
    }
    else if (level < 92) {
      baseStat = 100 + 20*((level - 71) / 20);
    }
    else if (level < 162) {
      baseStat = 120 + 15*((level - 91) / 70);
    }
    else {
      baseStat = 135 + 20*((level - 161) / 552);
    }
    
    // calcuation formula for the added value on top of the base stat for magic and holy defence
    const calculationFormula1 = (level: number) => {
      let stat = 0;
      if (level < 21) {
        stat += 40 * (level / 20)
      }
      else if (level < 36) {
        stat += 40 + 10 * ((level - 20) / 20)
      }
      else if (level < 61) {
        stat += 50 + 10 * ((level - 35) / 25)
      }
      else {
        stat += 60 + 10 * ((level - 60) / 39)
      }
      return stat;
    }
  
    // calculation formula used for same purpose, but for fire defence
    const calculationFormula2 = (level: number) => {
      let stat = 0;
      if (level < 31) {
        stat += 20 * (level  / 30)
      }
      else if (vigorLevel < 41) {
        stat += 20 + 20 * ((level - 30) / 10)
      }
      else if (vigorLevel < 61) {
        stat += 40 + 20 * ((level - 40) / 20)
      }
      else {
        stat += 60 + 10 * ((level - 60) / 39)
      }
      return stat;
    }
  
    // calculates the final values for the magic defences, magic additionally scales
    // intelligence, fire scales with vigor and holy scales with arcane.
    let magic = baseStat + calculationFormula1(intelligenceLevel);
    let fire = baseStat + calculationFormula2(vigorLevel);
    let lightning = baseStat;
    let holy = baseStat + calculationFormula1(arcaneLevel);
  
    return [magic, fire, lightning, holy].map(i => Math.floor(i))
  }
  
  /**
   * Calculates and returns the total value for each resistance that comes from the
   * selected armours. Unlike damage negation, resistances are additive and scale linearly.
   * @param armours 
   * @returns 
   */
  export function calculateArmourResistances(armours: Armour[]) {
    let resistances = [0, 0, 0, 0];
    armours.forEach((armour) => {
      if (armour != null) {
        resistances[0] += armour.resistances.immunity
        resistances[1] += armour.resistances.robustness
        resistances[2] += armour.resistances.focus
        resistances[3] += armour.resistances.vitality
      }
    })
    return resistances;
  }

  /**
   * Calculates and returns the total value for each resistance based on total level,
   * vigor, endurance, mind, arcane, armours, and talismans.
   * @param totalStats 
   * @param level 
   * @param selectedArmours 
   * @param selectedTalismans 
   * @returns 
   */
  export function calculateResistances(totalStats: CharacterStats, level: number, selectedArmours: Armour[], selectedTalismans: Talisman[], selectedTears?: CrystalTear[]) {
    const vigorLevel = totalStats.vigor;
    const enduranceLevel = totalStats.endurance;
    const mindLevel = totalStats.mind;
    const arcaneLevel = totalStats.arcane;
  
    let baseStat = 0;
      
    // calculates base resistance number based on given total level
    if (level < 72) {
      baseStat = 75 + 30*((level + 78) / 149);
    }
    else if (level < 92) {
      baseStat = 105 + 40*((level - 71) / 20);
    }
    else if (level < 162) {
      baseStat = 145 + 15*((level - 91) / 70);
    }
    else {
      baseStat = 160 + 20*((level - 161) / 552);
    }
    
    // calcuation formula for the added value on top of the base stat for
    // immunity, robustness, and focus
    const calculationFormula1 = (level: number) => {
      let stat = 0;
      if (level < 31) {
        stat = 0;
      }
      else if (level < 41) {
        stat += 30 * ((level - 30) / 10)
      }
      else if (level < 61) {
        stat += 30 + 10 * ((level - 40) / 20)
      }
      else {
        stat += 40 + 10 * ((level - 60) / 39)
      }
      return stat;
    }
    
    // calcualtion formula used for same purpose, but for vitality
    const calculationFormula2 = (level: number) => {
      let stat = 0;
      if (level < 16) {
        stat = level;
      }
      else if (level < 41) {
        stat += 15 + 15*((level - 15) / 25)
      }
      else if (level < 61) {
        stat += 30 + 10*((level - 40) / 20)
      }
      else {
        stat += 40 + 10*((level - 60) / 39)
      }
      return stat;
    }
    
    // grabs all the resistance values from selected armours
    const armourResistances = calculateArmourResistances(selectedArmours);
  
    // calculates all the resistance values by adding base value, added value from stat value,
    // and from armours.
    let immunity = baseStat + calculationFormula1(vigorLevel) + armourResistances[0];
    let robustness = baseStat + calculationFormula1(enduranceLevel)+ armourResistances[1];
    let focus = baseStat + calculationFormula1(mindLevel)+ armourResistances[2];
    let vitality = baseStat + calculationFormula2(arcaneLevel)+ armourResistances[3];
  
    // loops through each talisman, checks if they affect any of the resistances, and adds to value if so
    selectedTalismans.forEach(talisman => {
      if (talisman?.statChanges?.immunity) immunity += +talisman.statChanges.immunity;
      if (talisman?.statChanges?.robustness) robustness += +talisman.statChanges.robustness;
      if (talisman?.statChanges?.focus) focus += +talisman.statChanges.focus;
      if (talisman?.statChanges?.vitality) vitality += +talisman.statChanges.vitality;
    })

    if (!selectedTears) return [immunity, robustness, focus, vitality].map(i => Math.floor(i));

    selectedTears.forEach(tear => {
      if (tear?.statChanges?.immunity) immunity += +tear.statChanges.immunity;
      if (tear?.statChanges?.robustness) robustness += +tear.statChanges.robustness;
      if (tear?.statChanges?.focus) focus += +tear.statChanges.focus;
      if (tear?.statChanges?.vitality) vitality += +tear.statChanges.vitality;
    });

    return [immunity, robustness, focus, vitality].map(i => Math.floor(i));
  }
