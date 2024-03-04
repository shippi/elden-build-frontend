import { useState } from "react";
import { DropDown } from ".";

interface Talisman {
    id: string,
    name: string,
    effect: string
}

interface Props {
    talismans: Talisman[],
    indices: number[],
    onChange: Function
}

function TalismansPanel({talismans, indices, onChange} : Props) {
    const[currIndex, setCurrIndex] = useState(0);

    const handleOnChange = (newIndex: number) => {
        const newIndeces = [...indices];
        newIndeces[currIndex] = newIndex;
        onChange(newIndeces);
    }

    return (
        <div className="talismans-panel">
            {/* div for selecting talismans*/}
            <div>
                {
                    indices.map((i, j) => (
                        <div onClick={() => {setCurrIndex(j)}}>
                            <label>Talisman {j+1} </label>
                            <DropDown items={talismans} index={indices[j]} isNullable={true} onChange={handleOnChange}/>
                        </div>
                    ))
                }
            </div>
            <div className="active-effects">
                <label>Active Effects:</label>
                <ul>
                {
                    indices.map((i, j) => (
                        <li className={i > 0 ? "" : "hidden"}>{i > 0 ? talismans[i].effect : ""}</li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default TalismansPanel