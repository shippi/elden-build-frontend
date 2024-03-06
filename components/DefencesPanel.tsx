'use client'

import { useState } from 'react';
import { Armour, CharacterClass, CharacterStats } from './types'

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[]
}

function DefencesPanel({characterClass, characterLevelStats, armours} : Props) {
  const PHYSICAL_DEFENCE_NAMES = ["Physical", "VS Strike", "VS Slash", "VS Pierce"]
  const MAGIC_DEFENCE_NAMES = ["Magic", "Fire", "Lightning", "Holy"]
  const physicalDefences = calculatePhysicalDefences(characterClass, characterLevelStats);
  const magicDefences = calculateMagicDefences(characterClass, characterLevelStats)

  return (
    <div className="defences-panel">
      <table>
        <tr>
          <th></th>
          <th>Defence</th>
          <th>Negation</th>
        </tr>
        {
          PHYSICAL_DEFENCE_NAMES.map((stat, i) => (
            <tr>
              <td>{stat}</td>
              <td className="value">{physicalDefences} /</td>
              <td className="value">
                {calculatePhysicalNegations(armours)[i].toFixed(3)}
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
                
              </td>
          </tr>
          ))
        }
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

function calculatePhysicalNegations(selectedArmours: Armour[]) {
  let negationValues = [0, 0, 0, 0];

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

    let magic = baseStat;
    let fire = baseStat;
    let lightning = baseStat;
    let holy = baseStat;

    // calculate magic defence based on intelligence level
    if (intelligenceLevel < 21) {
      magic += 40 * (intelligenceLevel / 20)
    }
    else if (intelligenceLevel < 36) {
      magic += 40 + 10 * ((intelligenceLevel - 20) / 20)
    }
    else if (intelligenceLevel < 61) {
      magic += 50 + 10 * ((intelligenceLevel - 35) / 25)
    }
    else {
      magic += 60 + 10 * ((intelligenceLevel - 60) / 39)
    }

    // calculate holy defence based on arcane level
    if (arcaneLevel < 21) {
      holy += 40 * (arcaneLevel / 20)
    }
    else if (arcaneLevel < 36) {
      holy += 40 + 10 * ((arcaneLevel - 20) / 20)
    }
    else if (arcaneLevel < 61) {
      holy += 50 + 10 * ((arcaneLevel - 35) / 25)
    }
    else {
      holy += 60 + 10 * ((arcaneLevel - 60) / 39)
    }

    // calculate fire defence based on vigor level
    if (vigorLevel < 31) {
      fire += 20 * (vigorLevel / 30)
    }
    else if (vigorLevel < 41) {
      fire += 20 + 20 * ((vigorLevel - 30) / 10)
    }
    else if (vigorLevel < 61) {
      fire += 40 + 20 * ((vigorLevel - 40) / 20)
    }
    else {
      fire += 60 + 10 * ((vigorLevel - 60) / 39)
    }
    return [magic, fire, lightning, holy].map(i => Math.floor(i))
}
