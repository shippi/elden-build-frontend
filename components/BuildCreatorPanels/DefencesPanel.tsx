import { Armour, CharacterClass, GreatRune, Talisman } from '@/utils/types'
import { calculatePhysicalDefences, calculateMagicDefences, calculateBaseResistances, calculateArmourResistances, calculateNegations } from '@/utils/DefencesUtils'
import { PanelTitle } from '..'
import { calculateTotalLevel, getTotalStats } from '@/utils/BuildCreatorUtils'

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    talismans: Talisman[],
    greatRune?: GreatRune
}

function DefencesPanel({characterClass, characterLevelStats, armours, talismans, greatRune} : Props) {
  const PHYSICAL_DEFENCE_NAMES = ["Physical", "VS Strike", "VS Slash", "VS Pierce"]
  const MAGIC_DEFENCE_NAMES = ["Magic", "Fire", "Lightning", "Holy"]
  const RESISTANCE_NAMES = ["Immunity", "Robustness", "Focus", "Vitality"]
  
  const totalStats = getTotalStats(characterClass, characterLevelStats, armours, talismans, false, greatRune);
  const totalLevel = calculateTotalLevel(totalStats);

  const physicalDefences = calculatePhysicalDefences(totalStats, totalLevel);
  const magicDefences = calculateMagicDefences(totalStats, totalLevel);
  const resistances = calculateBaseResistances(totalStats, totalLevel, armours, talismans)
  const armourResistances = calculateArmourResistances(armours);

  return (
    <>
    <PanelTitle text="Defence/Damage Negation" img="icons/defence.png"/>
    <div className="defences-panel">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
          <tbody>
          {
            PHYSICAL_DEFENCE_NAMES.map((stat, i) => (
              <tr key={stat}>
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
              <tr key={stat}>
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
      </div>
      <div style={{height:"2vh"}}/>
      <PanelTitle text="Resistance" img="icons/resistance.png"/>
      <div className="defences-panel">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { 
            RESISTANCE_NAMES.map((stat, i)=> (
              <tr key={stat}>
                <td>{stat}</td>
                <td className="value">{resistances[i]} /</td>
                <td className="value">{armourResistances[i]}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default DefencesPanel