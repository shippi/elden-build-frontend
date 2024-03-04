'use client'

import React, { useEffect, useState } from 'react'
import { DropDown, StatRow } from '.'

interface CharacterStats { 
    level: string, 
    vigor: string, 
    mind: string, 
    endurance: string, 
    strength: string, 
    dexterity: string, 
    intelligence: string, 
    faith: string, 
    arcane: string
}

interface CharacterClass {
    id: string,
    name: string,
    image: string,
    description: string,
    stats: CharacterStats
}

interface Props {
    classes: CharacterClass[],
    index: number,
    onChange: Function,
    onStatChange: Function
}

function CharacterPanel({ classes, index, onChange, onStatChange } : Props) {
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
      dexerity: dexterity,
      intelligence: intelligence,
      faith: faith,
      arcane: arcane
    });
  }, [vigor, mind, endurance, strength, dexterity, intelligence, faith, arcane]);

  // calculates level based on base level of class and by adding up all added stats
  const selectedClass = classes[index];
  const level = +selectedClass.stats.level + vigor + mind + endurance + strength + dexterity + intelligence + faith + arcane;

  return (
    <div className="character-panel">
      {/* div for selecting starting class */}
      <div className="starting-class">
        <label>Starting Class </label>
        <DropDown items={classes} index={index} isNullable={false} onChange={onChange}/>
      </div>

      {/* div for modifying character stats */}
      <div className="character-stats">
        <label>Character Statistics </label>
        <StatRow type="Vigor" initialValue={selectedClass.stats.vigor} addedValue={vigor} onChange={setVigor}/>
        <StatRow type="Mind" initialValue={selectedClass.stats.mind} addedValue={mind} onChange={setMind}/>
        <StatRow type="Endurance" initialValue={selectedClass.stats.endurance} addedValue={endurance} onChange={setEndurance}/>
        <StatRow type="Strength" initialValue={selectedClass.stats.strength} addedValue={strength} onChange={setStrength}/>
        <StatRow type="Dexterity" initialValue={selectedClass.stats.dexterity} addedValue={dexterity} onChange={setDexterity}/>
        <StatRow type="Intelligence" initialValue={selectedClass.stats.intelligence} addedValue={intelligence} onChange={setIntelligence}/>
        <StatRow type="Faith" initialValue={selectedClass.stats.faith} addedValue={faith} onChange={setFaith}/>
        <StatRow type="Arcane" initialValue={selectedClass.stats.arcane} addedValue={arcane} onChange={setArcane}/>
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

