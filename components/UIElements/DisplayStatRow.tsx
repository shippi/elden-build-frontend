import { calculateStatLevel, getEquipmentValues } from "@/helpers/BuildCreatorHelper";
import { Armour, Talisman } from "@/helpers/types";

interface Props {
    type: string,
    initialValue: string,
    addedValue: number,
    selectedTalismans?: Talisman[],
    selectedArmours?: Armour[]
}

function DisplayStatRow({type, initialValue, addedValue, selectedTalismans, selectedArmours} : Props) {
    const totalValue = calculateStatLevel(+initialValue, +addedValue, selectedTalismans && getEquipmentValues(selectedTalismans, type), selectedArmours && getEquipmentValues(selectedArmours, type));
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