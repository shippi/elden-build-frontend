'use client'
import { getTotalStats } from "@/helpers/BuildCreatorHelper"
import { Weapon } from "@/helpers/types"
import { calculateAttackPower } from "@/helpers/AttackPowerPanelHelper";
import { PanelTitle } from "..";
import { useContext } from "react";
import BuildCreatorContext from "@/context/BuildCreatorContext";

function AttackPowerPanel() {
    const {selectedClass, characterStats, selectedArmours, selectedTalismans, selectedWeapons, selectedAffinities, selectedWepLvls, twoHanded, runeEffect, selectedTears, tearActivated} = useContext(BuildCreatorContext);
    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, twoHanded, runeEffect, tearActivated ? selectedTears : undefined);

    return (
    <div>
    <PanelTitle text="Attack Power/Spell Scaling" img="/icons/attack-power.png"/>
    
    <div className="attack-power-panel">
        {
            selectedWeapons.map((weapon: Weapon, i: number) => {
                const attackPower = calculateAttackPower(weapon, selectedAffinities[i], selectedWepLvls[i], totalStats, selectedTalismans, tearActivated && selectedTears);
                return (
                    <div key={i}>
                        <span className="attack-power" data-alt={attackPower.attackPowerAlt}>
                        {(i < 3 ? "L Armament " : "R Armament ") + (i % 3 + 1)}
                        </span>
                        {
                            Math.floor(
                                attackPower
                                .finalAttackValues
                                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                            )
                        } 
                        {
                            ["staff", "seal"].includes(weapon?.type) && " / " + attackPower.sorceryScaling
                        }
                    </div>
            )})
        }
    </div>
    </div>
  )
}

export default AttackPowerPanel