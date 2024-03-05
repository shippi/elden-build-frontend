
import { Armour, CharacterClass, CharacterStats } from './types'

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    armourIndices: number[]
}

function DefencesPanel({characterClass, characterLevelStats, armours, armourIndices} : Props) {
  const PHYSICAL_DEFENCE_NAMES = ["Physical", "VS Strike", "VS Slash", "VS Pierce"]
  const selectedArmours = getSelectedArmours(armours, armourIndices);
  const physicalDefences = calculatePhysicalDefences(characterClass, characterLevelStats, selectedArmours);


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
                {calculatePhysicalNegations(selectedArmours)[i].toFixed(3)}
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}

export default DefencesPanel

function getSelectedArmours(armours: Armour[], armourIndices: number[]) {
  const armoursArr = [
    [...armours].filter(armour => (armour.category == "Helm")),
    [...armours].filter(armour => (armour.category == "Chest Armor")),
    [...armours].filter(armour => (armour.category == "Gauntlets")),
    [...armours].filter(armour => (armour.category == "Leg Armor"))
  ]

  let selectedArmours: Armour[] = [];
  armourIndices.forEach((i, j) => {
    if (i > -1) {
      selectedArmours.push(armoursArr[j][i]);
    }
   
  });
  return selectedArmours;
}

function calculateLevel(characterClass: CharacterClass, characterLevelStats: CharacterStats) {
  const level = +characterClass.stats.level + +characterLevelStats.vigor + +characterLevelStats.mind + 
                +characterLevelStats.endurance + +characterLevelStats.strength + +characterLevelStats.dexterity + 
                +characterLevelStats.intelligence + +characterLevelStats.faith + +characterLevelStats.arcane;             
  return level;
}

function calculatePhysicalDefences(characterClass: CharacterClass, characterLevelStats: CharacterStats, selectedArmours: Armour[]) {
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
    negationValues.forEach((currentValue, j) => {
      negationValues[j] = currentValue - ((currentValue * armour.dmgNegation[j].amount)/100) + armour.dmgNegation[j].amount;
    })
  })
  console.log(selectedArmours);
  console.log(negationValues);
  return negationValues;
}
