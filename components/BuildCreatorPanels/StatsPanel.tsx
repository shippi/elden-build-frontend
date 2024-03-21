import { Armour, CharacterClass, CharacterStats, GreatRune, Talisman, Weapon } from "@/utils/types"
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateDiscovery, calculatePoise, calculateWeight, getWeightRatio } from "@/utils/StatsUtils";
import { PanelTitle } from "..";

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    weapons: Weapon[],
    talismans: Talisman[],
    greatRune?: GreatRune
}

function StatsPanel({characterClass, characterLevelStats, armours, weapons, talismans, greatRune} : Props) {
  const hp = calculateHP(characterClass, characterLevelStats, talismans, armours, greatRune);
  const fp = calculateFP(characterClass, characterLevelStats, talismans, armours, greatRune);
  const stamina = calculateStamina(characterClass, characterLevelStats, talismans, armours, greatRune);
  const equipLoad = calculateEquipLoad(characterClass, characterLevelStats, talismans, greatRune);
  const totalWeight = calculateWeight(armours, talismans, weapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(armours, talismans);
  const discovery = calculateDiscovery(characterClass, characterLevelStats, talismans, armours, greatRune);

  return (
    <>
    <PanelTitle text="Base Stats" img="icons/base-stats.png"/>
    <div className="stats-panel">
      <div>
        <span>HP</span> {hp}
      </div>
      <div>
        <span>FP</span> {fp}
      </div>
      <div>
        <span>Stamina</span> {stamina}
      </div>
      <br/>
      <div>
        <span>Equip Load</span> {totalWeight.toFixed(1)} / {equipLoad.toFixed(1)}
        
      </div>
      <div><i/>{weightRatio}</div>
      <br/>
      <div>
        <span>Poise</span> {poise}
      </div>
      <div>
        <span>Discovery</span> {discovery}
      </div>
    </div>
    </>
  )
  
}

export default StatsPanel

