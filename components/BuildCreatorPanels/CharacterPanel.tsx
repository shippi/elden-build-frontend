'use client'
import { useContext, useEffect, useState } from 'react'
import { DropDown, PanelTitle, StatRow } from '..'
import { calculateTotalRunes } from '@/helpers/CharacterPanelHelper'
import { classes } from '@/public/data/Equipment/classes'
import BuildCreatorContext from '@/context/BuildCreatorContext'
import { getIndexOfItem } from '@/helpers/BuildCreatorHelper'

function CharacterPanel() {
  const {characterStats, selectedClass, selectedTalismans, selectedArmours, runeEffect, setSelectedClass, setCharacterStats} = useContext(BuildCreatorContext);
  
  const [index, setIndex] = useState(getIndexOfItem(selectedClass.name, classes));
  
  // states for character added stats
  const [vigor, setVigor] = useState(characterStats.vigor);
  const [mind, setMind] = useState(characterStats.mind);
  const [endurance, setEndurance] = useState(characterStats.endurance);
  const [strength, setStrength] = useState(characterStats.strength);
  const [dexterity, setDexterity] = useState(characterStats.dexterity);
  const [intelligence, setIntelligence] = useState(characterStats.intelligence);
  const [faith, setFaith] = useState(characterStats.faith);
  const [arcane, setArcane] = useState(characterStats.arcane);

  // hook used to update the character stats stored in 
  // the parent component (build creator page)
  useEffect(() => {
    setCharacterStats({
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

  const handleOnChange = (newIndex: number) => {
    setIndex(newIndex);
    setSelectedClass(classes[newIndex]);
  }

  // calculates level based on base level of class and by adding up all added stats
  const level = +selectedClass.stats.level + vigor + mind + endurance + strength + dexterity + intelligence + faith + arcane;

  const runesNeeded = calculateTotalRunes(+selectedClass.stats.level, level);

  return (
    <>
    <div className="character-panel">
      {/* div for selecting starting class */}
      <div className="starting-class">
        <label>Starting Class </label>
        <DropDown items={classes} index={index} isNullable={false} onChange={handleOnChange} hasImages={true} />
      </div>
    </div>
    <div style={{height:"2vh"}}/>
    <PanelTitle text="Attribute Points" img="icons/attribute-points.png"/>
    <div className="character-panel">
      {/* div for modifying character stats */}
      <div className="character-stats">
        <StatRow type="Vigor" initialValue={selectedClass.stats.vigor} addedValue={vigor} onChange={setVigor} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Mind" initialValue={selectedClass.stats.mind} addedValue={mind} onChange={setMind} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Endurance" initialValue={selectedClass.stats.endurance} addedValue={endurance} onChange={setEndurance} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Strength" initialValue={selectedClass.stats.strength} addedValue={strength} onChange={setStrength} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Dexterity" initialValue={selectedClass.stats.dexterity} addedValue={dexterity} onChange={setDexterity} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Intelligence" initialValue={selectedClass.stats.intelligence} addedValue={intelligence} onChange={setIntelligence} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Faith" initialValue={selectedClass.stats.faith} addedValue={faith} onChange={setFaith} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
        <StatRow type="Arcane" initialValue={selectedClass.stats.arcane} addedValue={arcane} onChange={setArcane} talismans={selectedTalismans} armours={selectedArmours} greatRune={runeEffect}/>
      </div>

      {/* div for displaying level requirement for modified stats */}
      <div className="level-container">
        <br/>
        <div>
          <label>Level: </label>
          <span>{level}</span>
        </div>
        <br/>
        <div>
          <label>Total Runes Needed: </label>
          <span>{runesNeeded.toLocaleString()}</span>
        </div>
      </div>
    </div>  
    
    </>
  )
}

export default CharacterPanel

