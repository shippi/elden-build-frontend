import { BuildPageContext } from "@/context/BuildPageContext";
import { calculateStatLevel, getEquipmentValues, getRuneValue } from "@/helpers/BuildCreatorHelper";
import { Armour, CrystalTear, GreatRune, Talisman } from "@/helpers/types";
import { useContext } from "react";

interface Props {
    type: string,
    initialValue: string,
    addedValue: number,
    selectedTalismans?: Talisman[],
    selectedArmours?: Armour[],
    greatRune?: GreatRune,
    selectedTears?: CrystalTear[]
}

function DisplayStatRow({type, initialValue, addedValue, selectedTalismans, selectedArmours, greatRune, selectedTears} : Props) {
    const { runeActivated, physickActivated } = useContext(BuildPageContext);
    const totalValue = calculateStatLevel(+initialValue, +addedValue, selectedTalismans && getEquipmentValues(selectedTalismans, type), selectedArmours && getEquipmentValues(selectedArmours, type), runeActivated && getRuneValue(type, greatRune), (selectedTears && physickActivated) ? getEquipmentValues(selectedTears, type) : undefined);
    return (
        <div className="stat-row">
            <div className='label'>{ type }</div>
            <div className="number-container">
                <div className={"number-input " + (addedValue > 0 && "adjusted")} style={{borderColor: "grey"}}>{+initialValue + addedValue}</div>
                &nbsp; /&nbsp; 99
            </div>
            <div style={{width: "40px", textAlign:"right"}}>
            <div className={(totalValue != +initialValue + addedValue) ? "adjusted" : ""}>
                {totalValue}
            </div>
            
        </div>
        </div>
    )
}

export default DisplayStatRow