'use client'

import React, { useState } from 'react'
import DropDown from './DropDown'
import StatRow from './StatRow'
import useForceUpdate from '@/hooks/useForceUpdate'

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
    onChange: Function
}

function CharacterPanel({ classes, index, onChange } : Props) {
  // states for character added stats
  const [vigor, setVigor] = useState(0);
  const [mind, setMind] = useState(0);
  const [endurance, setEndurance] = useState(0);
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [intelligence, setIntelligence] = useState(0);
  const [faith, setFaith] = useState(0);
  const [arcane, setArcane] = useState(0);

  const selectedClass = classes[index];
  const level = +selectedClass.stats.level + vigor + mind + endurance + strength + dexterity + intelligence + faith + arcane;

  return (
    <div className="character-panel">
      <div className="starting-class">
        <label>Starting Class </label>
        <DropDown items={classes} index={index} onChange={onChange}/>
      </div>
      
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
      <div className="level-container">
          <label>Total Level: </label>
          <span>{level}</span>
          <hr></hr>
        </div>
    </div>  
  )
}

export default CharacterPanel

