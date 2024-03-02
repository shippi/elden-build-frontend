import React from 'react'
import DropDown from './DropDown'

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
  return (
    <div className="character-panel">
      <div className="starting-class">
        <label>Starting Class: </label>
        <DropDown items={classes} index={index} onChange={onChange}/>
      </div>

        
    </div>
  )
}

export default CharacterPanel