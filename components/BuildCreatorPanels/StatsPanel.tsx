import { Armour, CharacterClass, CharacterStats, GreatRune, Talisman, Weapon } from "@/utils/types"
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateDiscovery, calculatePoise, calculateWeight, getWeightRatio } from "@/utils/StatsUtils";
import { PanelTitle } from "..";
import { getTotalStats } from "@/utils/BuildCreatorUtils";

interface Props {
    characterClass: CharacterClass,
    characterLevelStats: any,
    armours: Armour[],
    weapons: Weapon[],
    talismans: Talisman[],
    greatRune?: GreatRune
}

function StatsPanel({characterClass, characterLevelStats, armours, weapons, talismans, greatRune} : Props) {
  const totalStats = getTotalStats(characterClass, characterLevelStats, armours, talismans, false, greatRune);
  
  const hp = calculateHP(totalStats.vigor, talismans, armours, greatRune);
  const fp = calculateFP(totalStats.mind, talismans, armours, greatRune);
  const stamina = calculateStamina(totalStats.endurance, talismans, armours, greatRune);
  const equipLoad = calculateEquipLoad(totalStats.endurance, talismans, greatRune);
  const totalWeight = calculateWeight(armours, talismans, weapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(armours, talismans);
  const discovery = calculateDiscovery(totalStats.arcane, talismans, armours, greatRune);

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
        <span>Discovery</span> {discovery.toFixed(1)}
      </div>
    </div>
    </>
  )
  
}

export default StatsPanel

