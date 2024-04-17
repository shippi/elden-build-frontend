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
        </div>
        </>

    )
}

export default DisplayArmours