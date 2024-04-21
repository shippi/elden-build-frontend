import { BuildPageContext } from "@/context/BuildPageContext";
import { calculateTotalLevel, getTotalStats } from "@/helpers/BuildCreatorHelper";
import { calculatePhysicalDefences, calculateMagicDefences, calculateResistances, calculateArmourResistances, calculateNegations } from "@/helpers/DefencesHelper";
import { PHYSICAL_DEFENCE_NAMES, MAGIC_DEFENCE_NAMES, RESISTANCE_NAMES } from "@/helpers/consts";
import { CharacterClass, CharacterStats, Talisman, Armour, CrystalTear, Weapon, GreatRune } from "@/helpers/types";
import { useContext } from "react";
import PanelTitle from "../UIElements/PanelTitle";

interface Props {
    selectedClass: CharacterClass,
    characterStats: CharacterStats,
    selectedTalismans: Talisman[],
    selectedArmours: Armour[],
    selectedTears: CrystalTear[]
    greatRune: GreatRune
  }

function DisplayDefenses({selectedClass, characterStats, selectedTalismans, selectedArmours, greatRune, selectedTears} : Props) {
    const { physickActivated, runeActivated } = useContext(BuildPageContext);
    
    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
    const totalLevel = calculateTotalLevel(totalStats);
    
    const physicalDefences = calculatePhysicalDefences(totalStats, totalLevel);
    const magicDefences = calculateMagicDefences(totalStats, totalLevel);
    const resistances = calculateResistances(totalStats, totalLevel, selectedArmours, selectedTalismans, physickActivated ? selectedTears : undefined);
    const armourResistances = calculateArmourResistances(selectedArmours);
    return (
        <div>
        <PanelTitle text="Defence/Damage Negation" img="/icons/defence.png"/>
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
                      {calculateNegations(selectedArmours, selectedTalismans, physickActivated ? selectedTears : undefined)[i].toFixed(3)}
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
                      {calculateNegations(selectedArmours, selectedTalismans, physickActivated ? selectedTears : undefined)[i+4].toFixed(3)}
                    </td>
                </tr>
                ))
              }
            </tbody>
          </table>
          </div>
          <div style={{height:"2vh"}}/>
          <PanelTitle text="Resistance" img="/icons/resistance.png"/>
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
        </div>
      )
}

export default DisplayDefenses