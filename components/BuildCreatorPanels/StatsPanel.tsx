'use client'
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateDiscovery, calculatePoise, calculateWeight, getWeightRatio } from "@/helpers/StatsHelper";
import { useContext } from "react";
import { PanelTitle } from "..";
import { getTotalStats } from "@/helpers/BuildCreatorHelper";
import BuildCreatorContext from "@/context/BuildCreatorContext";

function StatsPanel() {
  const {selectedClass, characterStats, selectedArmours, selectedTalismans, selectedWeapons, runeEffect, tearActivated, selectedTears} = useContext(BuildCreatorContext);
  
  const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeEffect, tearActivated ? selectedTears : undefined);
  
  const hp = calculateHP(totalStats.vigor, selectedTalismans, selectedArmours, runeEffect, tearActivated ? selectedTears : undefined);
  const fp = calculateFP(totalStats.mind, selectedTalismans, selectedArmours, runeEffect, tearActivated ? selectedTears : undefined);
  const stamina = calculateStamina(totalStats.endurance, selectedTalismans, selectedArmours, runeEffect, tearActivated ? selectedTears : undefined);
  const equipLoad = calculateEquipLoad(totalStats.endurance, selectedTalismans, runeEffect, tearActivated ? selectedTears : undefined);
  const totalWeight = calculateWeight(selectedArmours, selectedTalismans, selectedWeapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(selectedArmours, selectedTalismans);
  const discovery = calculateDiscovery(totalStats.arcane, selectedTalismans, selectedArmours, runeEffect);

  return (
    <div>
    <PanelTitle text="Base Stats" img="/icons/base-stats.png"/>
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
    </div>
  )
  
}

export default StatsPanel

