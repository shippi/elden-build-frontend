import { CharacterClass } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem"

interface Props {
    selectedClass: CharacterClass
}

function DisplayCharacter({selectedClass} : Props) {
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
            
        </div>
    </div>
  )
}

export default DisplayCharacter