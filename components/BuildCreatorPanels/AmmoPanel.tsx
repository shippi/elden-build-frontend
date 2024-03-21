'use client'
import { Ammo } from "@/utils/types"
import { DropDown, PanelTitle } from ".."
import { useState } from "react";
import { getSelectedItems } from "@/utils/BuildCreatorUtils";
import { calculateAmmoAttackPower } from "@/utils/AmmoUtils";

interface Props {
    arrows: Ammo[],
    bolts: Ammo[],
    arrowsOnChange: Function,
    boltsOnChange: Function
}

function AmmoPanel({arrows, bolts, arrowsOnChange, boltsOnChange}: Props) {
    const [arrowsIndices, setArrowsIndices] = useState([-1, -1]);
    const [boltsIndices, setBoltsIndices] = useState([-1, -1]);
    const [currArrowIndex, setArrowCurrIndex] = useState(0);
    const [currBoltIndex, setBoltCurrIndex] = useState(0);

    const handleArrowChange = (newIndex: number) => {
        let newIndeces = [...arrowsIndices];
        newIndeces[currArrowIndex] = newIndex;

        const selectedArrows = getSelectedItems(arrows, newIndeces);

        setArrowsIndices(newIndeces);
        arrowsOnChange(selectedArrows);
    }

    const handleBoltChange = (newIndex: number) => {
        let newIndeces = [...boltsIndices];
        newIndeces[currBoltIndex] = newIndex;

        const selectedBolts = getSelectedItems(bolts, newIndeces);

        setBoltsIndices(newIndeces);
        boltsOnChange(selectedBolts);
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
                        <div className="ammo-info">
                            
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
                        <div className="ammo-info">
                            
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