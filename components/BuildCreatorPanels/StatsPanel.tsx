import { Armour, CharacterClass, CharacterStats, Talisman, Weapon } from "@/app/types"
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateDiscovery, calculatePoise, calculateWeight, getWeightRatio } from "@/utils/StatsUtils";

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    weapons: Weapon[],
    talismans: Talisman[]
}

function StatsPanel({characterClass, characterLevelStats, armours, weapons, talismans} : Props) {
  const hp = calculateHP(characterClass, characterLevelStats, talismans);
  const fp = calculateFP(characterClass, characterLevelStats, talismans);
  const stamina = calculateStamina(characterClass, characterLevelStats, talismans);
  const equipLoad = calculateEquipLoad(characterClass, characterLevelStats, talismans);
  const totalWeight = calculateWeight(armours, talismans, weapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(armours, talismans);
  const discovery = calculateDiscovery(characterClass, characterLevelStats, talismans);

  return (
    <div className="stats-panel">
      <div>
        <strong>HP</strong> {hp}
      </div>
      <div>
        <strong>FP</strong> {fp}
      </div>
      <div>
        <strong>Stamina</strong> {stamina}
      </div>
      <br/>
      <div>
        <strong>Equip Load</strong> {totalWeight.toFixed(1)} / {equipLoad.toFixed(1)}
        
      </div>
      <div><i/>{weightRatio}</div>
      <br/>
      <div>
        <strong>Poise</strong> {poise}
      </div>
      <div>
        <strong>Discovery</strong> {discovery}
      </div>
    </div>
  )
}

export default StatsPanel

