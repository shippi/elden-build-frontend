'use client'
import { PanelTitle } from '..'
import { useContext } from 'react';
import { calculateTotalLevel, getTotalStats } from '@/helpers/BuildCreatorHelper'
import { calculatePhysicalDefences, calculateMagicDefences, calculateResistances, calculateArmourResistances, calculateNegations } from '@/helpers/DefencesHelper'
import BuildCreatorContext from '@/context/BuildCreatorContext';
import { PHYSICAL_DEFENCE_NAMES, MAGIC_DEFENCE_NAMES, RESISTANCE_NAMES } from '@/helpers/consts';

function DefencesPanel() {
  const { selectedClass, selectedTalismans, selectedArmours, characterStats, runeEffect, setSelectedClass, setCharacterStats, tearActivated, selectedTears} = useContext(BuildCreatorContext);

  const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeEffect, tearActivated ? selectedTears : undefined);
  const totalLevel = calculateTotalLevel(totalStats);

  const physicalDefences = calculatePhysicalDefences(totalStats, totalLevel);
  const magicDefences = calculateMagicDefences(totalStats, totalLevel);
  const resistances = calculateResistances(totalStats, totalLevel, selectedArmours, selectedTalismans, tearActivated ? selectedTears : undefined);
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
                  {calculateNegations(selectedArmours, selectedTalismans, tearActivated ? selectedTears : undefined)[i].toFixed(3)}
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
                  {calculateNegations(selectedArmours, selectedTalismans, tearActivated ? selectedTears : undefined)[i+4].toFixed(3)}
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

export default DefencesPanel