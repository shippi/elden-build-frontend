import { Armour, CharacterClass, Talisman } from '@/app/types'
import { calculatePhysicalDefences, calculateMagicDefences, calculateBaseResistances, calculateArmourResistances, calculateNegations } from '@/utils/DefencesUtils'

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    talismans: Talisman[]
}

function DefencesPanel({characterClass, characterLevelStats, armours, talismans} : Props) {
  const PHYSICAL_DEFENCE_NAMES = ["Physical", "VS Strike", "VS Slash", "VS Pierce"]
  const MAGIC_DEFENCE_NAMES = ["Magic", "Fire", "Lightning", "Holy"]
  const RESISTANCE_NAMES = ["Immunity", "Robustness", "Focus", "Vitality"]

  const physicalDefences = calculatePhysicalDefences(characterClass, characterLevelStats);
  const magicDefences = calculateMagicDefences(characterClass, characterLevelStats)
  const resistances = calculateBaseResistances(characterClass, characterLevelStats, armours, talismans)
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
                <td className="value">{physicalDefences[i]} /</td>
                <td className="value">
                  {calculateNegations(armours, talismans)[i].toFixed(3)}
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
                  {calculateNegations(armours, talismans)[i+4].toFixed(3)}
                </td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <br/>
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