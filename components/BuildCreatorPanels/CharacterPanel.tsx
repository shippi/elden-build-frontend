'use client'

import React, { useEffect, useState } from 'react'
import { DropDown, StatRow } from '..'
import { Armour, CharacterClass, CharacterStats, Talisman } from '../types'

interface Props {
    classes: CharacterClass[],
    index: number,
    talismans: Talisman[],
    armours: Armour[]
    onChange: Function,
    onStatChange: Function
}

function CharacterPanel({ classes, index, talismans, armours, onChange, onStatChange } : Props) {
  // states for character added stats
  const [vigor, setVigor] = useState(0);
  const [mind, setMind] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [faith, setFaith] = useState(0);
  const [arcane, setArcane] = useState(0);

  // hook used to update the character stats stored in 
  // the parent component (build creator page)
  useEffect(() => {
    onStatChange({
      vigor: vigor,
      mind: mind,
      endurance: endurance,
      strength: strength,
      dexterity: dexterity,
      intelligence: intelligence,
      faith: faith,
      arcane: arcane
    });
  }, [vigor, mind, endurance, strength, dexterity, intelligence, faith, arcane]);

  console.log(vigor)
  // calculates level based on base level of class and by adding up all added stats
  const selectedClass = classes[index];
  const level = +selectedClass.stats.level + vigor + mind + endurance + strength + dexterity + intelligence + faith + arcane;

  return (
    <div className="character-panel">
      {/* div for selecting starting class */}
      <div className="starting-class">
        <label>Starting Class </label>
        <DropDown items={classes} index={index} isNullable={false} onChange={onChange} hasImages={true}/>
      </div>

      {/* div for modifying character stats */}
      <div className="character-stats">
        <label>Character Statistics </label>
        <StatRow type="Vigor" initialValue={selectedClass.stats.vigor} addedValue={vigor} onChange={setVigor} talismans={talismans} armours={armours}/>
        <StatRow type="Mind" initialValue={selectedClass.stats.mind} addedValue={mind} onChange={setMind} talismans={talismans} armours={armours}/>
        <StatRow type="Endurance" initialValue={selectedClass.stats.endurance} addedValue={endurance} onChange={setEndurance} talismans={talismans} armours={armours}/>
        <StatRow type="Strength" initialValue={selectedClass.stats.strength} addedValue={strength} onChange={setStrength} talismans={talismans} armours={armours}/>
        <StatRow type="Dexterity" initialValue={selectedClass.stats.dexterity} addedValue={dexterity} onChange={setDexterity} talismans={talismans} armours={armours}/>
        <StatRow type="Intelligence" initialValue={selectedClass.stats.intelligence} addedValue={intelligence} onChange={setIntelligence} talismans={talismans} armours={armours}/>
        <StatRow type="Faith" initialValue={selectedClass.stats.faith} addedValue={faith} onChange={setFaith} talismans={talismans} armours={armours}/>
        <StatRow type="Arcane" initialValue={selectedClass.stats.arcane} addedValue={arcane} onChange={setArcane} talismans={talismans} armours={armours}/>
      </div>

      {/* div for displaying level requirement for modified stats */}
      <div className="level-container">
          <label>Total Level: </label>
          <span>{level}</span>
      </div>
    </div>  
  )
}

export default CharacterPanel
