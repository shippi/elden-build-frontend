import { getItemFromName } from "@/helpers/BuildCreatorHelper"
import { Armour } from "@/helpers/types";
import { armours } from "@/public/data";
import { ListItem, PanelTitle } from "..";

interface Props {
    selectedArmours: string[]
}

function DisplayArmours({selectedArmours} : Props) {
    selectedArmours = selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    return (
        <>
        <PanelTitle text="Armour" img="/icons/armour.png"/>
        <div className="armour-panel">
        {
            selectedArmours.map((armour: any) => (
                <ListItem image={armour.image} text={armour.name}/>
            ))
        }
        <div className="active-effects">
            <label>Active Effects:</label>
            <ul>
            {
                selectedArmours.map((armour: any) => (
                    armour?.effect == null ? "" : 
                    <li key={armour.name}>{armour.effect}</li>
                ))
            }
            </ul>
            </div>
        </div>
        </>

    )
}

export default DisplayArmours