'use client'
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { DropDown, PanelTitle } from ".."
import { useContext, useState } from "react";
import { crystalTears } from "@/public/data/Equipment/crystalTears";
import { getIndicesOfItems, getSelectedItems, handleDropdownChange } from "@/helpers/BuildCreatorHelper";

function PhysickPanel() {
  const { selectedTears, setSelectedTears, tearActivated, setTearActivated } = useContext(BuildCreatorContext);

  const [indices, setIndices] = useState(getIndicesOfItems(selectedTears, crystalTears));
  const [currIndex, setCurrIndex] = useState(0);

  const disabled = indices[0] ==- 1 && indices[1] == -1;

  const handleOnChange = (newIndex: number) => {
    handleDropdownChange(indices, currIndex, newIndex, crystalTears, getSelectedItems, setIndices, setSelectedTears);
  }

  return (
    <div>
    <PanelTitle text="Flask of Wondrous Physick" img="icons/physick.png"/>
    <div className="physick-panel">
        {
          indices.map((i, j) => (
            <div className="selector" onClick={() => {setCurrIndex(j)}} key={j}>
                <label>Crystal Tear {j+1} </label>
                <DropDown items={crystalTears} index={indices[j]} isNullable={true} otherIndices={indices} hasImages={false} scrollPage={true} onChange={handleOnChange} searchEnabled={true}/>
            </div>
          ))
        }
        <div className="active-effects">
          <label>Active Effects:</label>
          <ul>
            {
              indices.map((i, j) => (
              <li className={i > -1 ? "" : "hidden"} key={j}>{i > -1 ? crystalTears[i].effect.charAt(0).toUpperCase() + crystalTears[i].effect.slice(1) : ""}</li>
              ))
            }
          </ul>
        </div>
        <br/>
        <div className={(disabled ? "disabled " : "") + "checkbox-container"} onClick={() => setTearActivated(!tearActivated)}>
          <input type="checkbox" checked={tearActivated} disabled={disabled} onChange={() => setTearActivated(!tearActivated)}/>
              Activate
        </div>
    </div>
    </div>
  )
}

export default PhysickPanel