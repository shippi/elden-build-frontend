import { CharacterClass, CharacterStats } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem"
import DisplayStatRow from "../UIElements/DisplayStatRow"
import { calculateTotalRunes } from "@/helpers/CharacterPanelHelper"

interface Props {
    selectedClass: CharacterClass,
    characterStats: CharacterStats
}

function DisplayCharacter({selectedClass, characterStats} : Props) {
  const level = calculateLevel(selectedClass.stats.level, characterStats)

  const runesNeeded = calculateTotalRunes(+selectedClass.stats.level, level);
  return (
    <div>
        <div className="character-panel">
            <div className="starting-class">
                <label>Starting Class </label>
                <ListItem image={selectedClass.image} text={selectedClass.name}/>
            </div>
        </div>
        <div style={{height:"2vh"}}/>
        <PanelTitle text="Attribute Points" img="/icons/attribute-points.png"/>
        <div className="character-panel">
            <DisplayStatRow type={"Vigor"} initialValue={selectedClass.stats.vigor} addedValue={characterStats.vigor}/>
            <DisplayStatRow type={"Mind"} initialValue={selectedClass.stats.mind} addedValue={characterStats.mind}/>
            <DisplayStatRow type={"Endurance"} initialValue={selectedClass.stats.endurance} addedValue={characterStats.endurance}/>
            <DisplayStatRow type={"Strength"} initialValue={selectedClass.stats.strength} addedValue={characterStats.strength}/>
            <DisplayStatRow type={"Dexterity"} initialValue={selectedClass.stats.dexterity} addedValue={characterStats.dexterity}/>
            <DisplayStatRow type={"Intelligence"} initialValue={selectedClass.stats.intelligence} addedValue={characterStats.intelligence}/>
            <DisplayStatRow type={"Faith"} initialValue={selectedClass.stats.faith} addedValue={characterStats.faith}/>
            <DisplayStatRow type={"Arcane"} initialValue={selectedClass.stats.arcane} addedValue={characterStats.arcane}/>
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
    </div>
  )
}

function calculateLevel(classLevel: string, stats: CharacterStats) {
  let level = +classLevel;

  Object.entries(stats).forEach((stat, i) => {
    level += stat[1];
  })
  return level;
}

export default DisplayCharacter