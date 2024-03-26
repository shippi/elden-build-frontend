'use client'
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateDiscovery, calculatePoise, calculateWeight, getWeightRatio } from "@/utils/StatsUtils";
import { useContext } from "react";
import { PanelTitle } from "..";
import { getTotalStats } from "@/utils/BuildCreatorUtils";
import BuildCreatorContext from "@/context/BuildCreatorContext";

function StatsPanel() {
  const {selectedClass, characterStats, selectedArmours, selectedTalismans, selectedWeapons, runeEffect} = useContext(BuildCreatorContext);
  
  const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeEffect);
  
  const hp = calculateHP(totalStats.vigor, selectedTalismans, selectedArmours, runeEffect);
  const fp = calculateFP(totalStats.mind, selectedTalismans, selectedArmours, runeEffect);
  const stamina = calculateStamina(totalStats.endurance, selectedTalismans, selectedArmours, runeEffect);
  const equipLoad = calculateEquipLoad(totalStats.endurance, selectedTalismans, runeEffect);
  const totalWeight = calculateWeight(selectedArmours, selectedTalismans, selectedWeapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(selectedArmours, selectedTalismans);
  const discovery = calculateDiscovery(totalStats.arcane, selectedTalismans, selectedArmours, runeEffect);

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

