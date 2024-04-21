import { BuildPageContext } from "@/context/BuildPageContext";
import { getTotalStats } from "@/helpers/BuildCreatorHelper";
import { useContext } from "react";
import PanelTitle from "../UIElements/PanelTitle"
import { Armour, CharacterClass, CharacterStats, CrystalTear, GreatRune, Talisman, Weapon } from "@/helpers/types";
import { calculateHP, calculateFP, calculateStamina, calculateEquipLoad, calculateWeight, getWeightRatio, calculatePoise, calculateDiscovery } from "@/helpers/StatsHelper";

interface Props {
  selectedClass: CharacterClass,
  characterStats: CharacterStats,
  selectedTalismans: Talisman[],
  selectedArmours: Armour[],
  selectedTears: CrystalTear[],
  selectedWeapons: Weapon[],
  greatRune: GreatRune
}

function DisplayStats({selectedClass, characterStats, selectedTalismans, selectedArmours, selectedWeapons, greatRune, selectedTears} : Props) {
  const { physickActivated, runeActivated } = useContext(BuildPageContext);
  const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
  const hp = calculateHP(totalStats.vigor, selectedTalismans, selectedArmours, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
  const fp = calculateFP(totalStats.mind, selectedTalismans, selectedArmours, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
  const stamina = calculateStamina(totalStats.endurance, selectedTalismans, selectedArmours, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
  const equipLoad = calculateEquipLoad(totalStats.endurance, selectedTalismans, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
  const totalWeight = calculateWeight(selectedArmours, selectedTalismans, selectedWeapons);
  const weightRatio = getWeightRatio(totalWeight, equipLoad);
  const poise = calculatePoise(selectedArmours, selectedTalismans);
  const discovery = calculateDiscovery(totalStats.arcane, selectedTalismans, selectedArmours, runeActivated ? greatRune : undefined);

  return (
    <div>
      <PanelTitle text="Base Stats" img="/icons/base-stats.png"/>
      <div className="stats-panel">
        <div><span>HP</span> {hp}</div>
        <div><span>FP</span> {fp}</div>
        <div><span>Stamina</span> {stamina}</div>
        <br/>
        <div><span>Equip Load</span> {totalWeight.toFixed(1)} / {equipLoad.toFixed(1)}</div>          <div><i/>{weightRatio}</div>
        <br/>
        <div><span>Poise</span> {poise}</div>
        <div><span>Discovery</span> {discovery.toFixed(1)}</div>
      </div>
    </div>
  )
}

export default DisplayStats