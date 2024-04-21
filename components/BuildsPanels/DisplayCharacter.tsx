import { Armour, CharacterClass, CharacterStats, GreatRune, Talisman } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem"
import DisplayStatRow from "../UIElements/DisplayStatRow"
import { calculateTotalRunes } from "@/helpers/CharacterPanelHelper"
import { STAT_NAMES } from "@/helpers/consts"

interface Props {
    selectedClass: CharacterClass,
    characterStats: CharacterStats,
    selectedTalismans: Talisman[],
    selectedArmours: Armour[],
    greatRune: GreatRune | undefined
}

function DisplayCharacter({selectedClass, characterStats, selectedTalismans, selectedArmours, greatRune} : Props) {
  const level = calculateLevel(selectedClass.stats.level, characterStats);
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
            {
              STAT_NAMES.map(stat => (
                <DisplayStatRow 
                  type={stat.charAt(0).toUpperCase() + stat.slice(1)} 
                  initialValue={selectedClass.stats[stat as keyof typeof selectedClass.stats]} 
                  addedValue={characterStats[stat as keyof typeof characterStats]}
                  selectedTalismans={selectedTalismans}
                  selectedArmours={selectedArmours}
                  greatRune={greatRune}
                />
              ))
            }
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