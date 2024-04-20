import { calculateStatLevel, getEquipmentValues } from "@/helpers/BuildCreatorHelper";
import { Talisman } from "@/helpers/types";

interface Props {
    type: string,
    initialValue: string,
    addedValue: number,
    selectedTalismans: Talisman[]
}

function DisplayStatRow({type, initialValue, addedValue, selectedTalismans} : Props) {
    const totalValue = calculateStatLevel(+initialValue, +addedValue, getEquipmentValues(selectedTalismans, type));
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