'use client'
import { DropDown, PanelTitle } from ".."
import { useContext, useState } from "react";
import { getIndicesOfItems, getSelectedItems, handleDropdownChange } from "@/helpers/BuildCreatorHelper";
import { calculateAmmoAttackPower } from "@/helpers/AmmoPanelHelper";
import { arrows, bolts } from "@/public/data";
import BuildCreatorContext from "@/context/BuildCreatorContext";

function AmmoPanel() {
    const {selectedArrows, selectedBolts, setSelectedArrows, setSelectedBolts} = useContext(BuildCreatorContext);

    const [arrowsIndices, setArrowsIndices] = useState(getIndicesOfItems(selectedArrows, arrows));
    const [boltsIndices, setBoltsIndices] = useState(getIndicesOfItems(selectedBolts, bolts));
    const [currIndex, setCurrIndex] = useState(0);

    const handleArrowChange = (newIndex: number) => {
        handleDropdownChange(arrowsIndices, currIndex, newIndex, arrows, getSelectedItems, setArrowsIndices, setSelectedArrows);
    }

    const handleBoltChange = (newIndex: number) => {
        handleDropdownChange(boltsIndices, currIndex, newIndex, bolts, getSelectedItems, setBoltsIndices, setSelectedBolts);
    }

    return (
        <div>
            <PanelTitle text="Ammo" img="icons/ammo.png"/>
            <div className="ammo-panel">
                
                {
                    arrowsIndices.map((arrowIndex, i) => {
                        const ammoAP = calculateAmmoAttackPower(arrows[arrowIndex]);
                        return (
                        <div className="selector" onClick={() => {setCurrIndex(i)}} key={i}>
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
                        <div className="selector" onClick={() => {setCurrIndex(i)}} key={i}>
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