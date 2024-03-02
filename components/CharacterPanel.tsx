import React from 'react'

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
    currentIndex: number
}

function CharacterPanel({ classes, currentIndex } : Props) {
  return (
    <div className="character-panel">
        { classes[currentIndex].name }
    </div>
  )
}

export default CharacterPanel