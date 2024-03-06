import { Armour, CharacterClass, CharacterStats } from './types'

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[]
}

function DefencesPanel({characterClass, characterLevelStats, armours} : Props) {
  const PHYSICAL_DEFENCE_NAMES = ["Physical", "VS Strike", "VS Slash", "VS Pierce"]
  const MAGIC_DEFENCE_NAMES = ["Magic", "Fire", "Lightning", "Holy"]
  const RESISTANCE_NAMES = ["Immunity", "Robustness", "Focus", "Vitality"]

  const physicalDefences = calculatePhysicalDefences(characterClass, characterLevelStats);
  const magicDefences = calculateMagicDefences(characterClass, characterLevelStats)
  const resistances = calculateBaseResistances(characterClass, characterLevelStats)
  const armourResistances = calculateArmourResistances(armours);

  return (
    <div className="defences-panel">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Defence</th>
            <th>Negation</th>
          </tr>
        </thead>
          <tbody>
          {
            PHYSICAL_DEFENCE_NAMES.map((stat, i) => (
              <tr>
                <td>{stat}</td>
                <td className="value">{physicalDefences} /</td>
                <td className="value">
                  {calculateNegations(armours)[i].toFixed(3)}
                </td>
              </tr>
            ))
          }
          {
            MAGIC_DEFENCE_NAMES.map((stat, i) => (
              <tr>
                <td>{stat}</td>
                <td className="value">{magicDefences[i]} /</td>
                <td className="value">
                  {calculateNegations(armours)[i+4].toFixed(3)}
                </td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Resistance</th>
            <th>Armor</th>
        </tr>
        </thead>
        <tbody>
          { 
            RESISTANCE_NAMES.map((stat, i)=> (
              <tr>
                <td>{stat}</td>
                <td className="value">{resistances[i]} /</td>
                <td className="value">{armourResistances[i]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DefencesPanel

function calculateLevel(characterClass: CharacterClass, characterLevelStats: CharacterStats) {
  const level = +characterClass.stats.level + +characterLevelStats.vigor + +characterLevelStats.mind + 
                +characterLevelStats.endurance + +characterLevelStats.strength + +characterLevelStats.dexterity + 
                +characterLevelStats.intelligence + +characterLevelStats.faith + +characterLevelStats.arcane;             
  return level;
}

function calculatePhysicalDefences(characterClass: CharacterClass, characterLevelStats: CharacterStats) {
  const level = calculateLevel(characterClass, characterLevelStats);
  const strengthLevel = +characterClass.stats.strength + +characterLevelStats.strength;
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

  return Math.floor(baseStat);
}

function calculateNegations(selectedArmours: Armour[]) {
  let negationValues = [0, 0, 0, 0, 0, 0, 0, 0];

  selectedArmours.forEach((armour, i) => {
    if (armour != null) {
      negationValues.forEach((currentValue, j) => {
        negationValues[j] = currentValue - ((currentValue * armour.dmgNegation[j].amount)/100) + armour.dmgNegation[j].amount;
      })
    }

  })
  return negationValues;
}

function calculateMagicDefences(characterClass: CharacterClass, characterLevelStats: CharacterStats) {
  const level = calculateLevel(characterClass, characterLevelStats);
  const intelligenceLevel = +characterClass.stats.intelligence + +characterLevelStats.intelligence;
  const vigorLevel = +characterClass.stats.vigor + +characterLevelStats.vigor;
  const arcaneLevel = +characterClass.stats.arcane + +characterLevelStats.arcane;

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

  let magic = baseStat + calculationFormula1(intelligenceLevel);
  let fire = baseStat + calculationFormula2(vigorLevel);
  let lightning = baseStat;
  let holy = baseStat + calculationFormula1(arcaneLevel);

  return [magic, fire, lightning, holy].map(i => Math.floor(i))
}

function calculateBaseResistances(characterClass: CharacterClass, characterLevelStats: CharacterStats) {
  const level = calculateLevel(characterClass, characterLevelStats);

  const vigorLevel = +characterClass.stats.vigor + +characterLevelStats.vigor;
  const enduranceLevel = +characterClass.stats.endurance + +characterLevelStats.endurance;
  const mindLevel = +characterClass.stats.mind + +characterLevelStats.mind;
  const arcaneLevel = +characterClass.stats.arcane + +characterLevelStats.arcane;

  let baseStat = 0;
    
  // calculates defense number based on given level
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

  let immunity = baseStat + calculationFormula1(vigorLevel);
  let robustness = baseStat + calculationFormula1(enduranceLevel);
  let focus = baseStat + calculationFormula1(mindLevel);
  let vitality = baseStat + calculationFormula2(arcaneLevel);

  return [immunity, robustness, focus, vitality].map(i => Math.floor(i));
}

function calculateArmourResistances(armours: Armour[]) {
  let resistances = [0, 0, 0, 0];
  armours.forEach(armour => {
    if(armour != null) {
      resistances.forEach((value, i) => {
        resistances[i] += armour.resistance[i].amount;
      });
    }
  });
  return resistances;
}