'use client'
import { Ammo } from "@/utils/types"
import { DropDown, PanelTitle } from ".."
import { useState } from "react";
import { getSelectedItems, handleDropdownChange } from "@/utils/BuildCreatorUtils";
import { calculateAmmoAttackPower } from "@/utils/AmmoUtils";

interface Props {
    arrows: Ammo[],
    bolts: Ammo[],
    onArrowsChange: Function,
    onBoltsChange: Function
}

function AmmoPanel({arrows, bolts, onArrowsChange, onBoltsChange}: Props) {
    const [arrowsIndices, setArrowsIndices] = useState([-1, -1]);
    const [boltsIndices, setBoltsIndices] = useState([-1, -1]);
    const [currArrowIndex, setArrowCurrIndex] = useState(0);
    const [currBoltIndex, setBoltCurrIndex] = useState(0);

    const handleArrowChange = (newIndex: number) => {
        handleDropdownChange(arrowsIndices, currArrowIndex, newIndex, arrows, getSelectedItems, setArrowsIndices, onArrowsChange);
    }

    const handleBoltChange = (newIndex: number) => {
        handleDropdownChange(boltsIndices, currBoltIndex, newIndex, bolts, getSelectedItems, setBoltsIndices, onBoltsChange);
    }

    return (
        <div>
            <PanelTitle text="Ammo" img="icons/ammo.png"/>
            <div className="ammo-panel">
                
                {
                    arrowsIndices.map((arrowIndex, i) => {
                        const ammoAP = calculateAmmoAttackPower(arrows[arrowIndex]);
                        return (
                        <div className="selector" onClick={() => {setArrowCurrIndex(i)}}>
                        <label>Arrow {i+1}</label>
                        <DropDown items={arrows} index={arrowIndex} isNullable={true} hasImages={true} incompatibilities={arrowsIndices} onChange={handleArrowChange} searchEnabled={true}/>
                        <div className="info">
                            <span className="ammo-effect">{arrows[arrowIndex]?.effect && "Effect: " + arrows[arrowIndex].effect}</span>
                            <span className="ammo-ap"  data-alt={ammoAP?.apAlt}>{ammoAP && "Attack Power: " + ammoAP.atkPower}</span>
                        </div>
                        </div>
                    )})
                }
                {
                    boltsIndices.map((arrowIndex, i) => {
                        const ammoAP = calculateAmmoAttackPower(bolts[arrowIndex]);
                        return (
                        <div className="selector" onClick={() => {setBoltCurrIndex(i)}}>
                        <label>Bolt {i+1}</label>
                        <DropDown items={bolts} index={arrowIndex} isNullable={true} hasImages={true} incompatibilities={boltsIndices} onChange={handleBoltChange} searchEnabled={true}/>
                        <div className="info">
                            
                            <span className="ammo-effect">{bolts[arrowIndex]?.effect && "Effect: " + bolts[arrowIndex].effect}</span>
                            <span className="ammo-ap"  data-alt={ammoAP?.apAlt}>{ammoAP && "Attack Power: " + ammoAP.atkPower}</span>
                        </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default AmmoPanel