'use client'
import { useState } from "react"
import { DisabledDropDown, DropDown, PanelTitle } from ".."
import { getSelectedItems, getTotalStats } from "@/utils/BuildCreatorUtils"
import { Armour, Ash, CharacterClass, CharacterStats, GreatRune, Talisman, Weapon } from "../../utils/types"
import { wepLevelsData } from "@/public/data"
import { getAshIndex, getAvailableAshes, getSelectedAshes, isRequiredStatsMet } from "@/utils/WeaponsUtils"

interface Props {
    weapons: Weapon[],
    ashes: Ash[],
    affinities: any[],
    characterClass: CharacterClass,
    characterStats: CharacterStats,
    armours: Armour[],
    talismans: Talisman[],
    greatRune?: GreatRune,
    onWepChange: Function,
    onAffChange: Function,
    onAshChange: Function,
    onLvlChange: Function,
    onTwoHandChange: Function
}

function WeaponsPanel({weapons, ashes, affinities, characterClass, characterStats, armours, talismans, greatRune, onWepChange, onAffChange, onAshChange, onLvlChange, onTwoHandChange} : Props) {
    const [wepIndices, setWepIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const [ashIndices, setAshIndices] = useState([-1, -1, -1, -1, -1, -1]);
    const [affIndices, setAffIndices] = useState([0, 0, 0, 0, 0, 0]);
    const [lvlIndices, setLvlIndices] = useState([0, 0, 0, 0, 0, 0]);
    const [currIndex, setCurrIndex] = useState(0);
    const [twoHanded, setTwoHanded] = useState(false);

    const totalStats = getTotalStats(characterClass, characterStats, armours, talismans, twoHanded, greatRune);
    const selectorPanels = [];

    const handleWepOnChange = (newIndex: number) => {
        let newIndices = [...wepIndices];
        newIndices[currIndex] = newIndex;
        const selectedWeapons = getSelectedItems(weapons, newIndices);
        setWepIndices(newIndices);

        let newAffIndices = [...affIndices];
        newAffIndices[currIndex] = 0;
        const selectedAffinities = getSelectedItems(affinities, newAffIndices).map(aff => aff.name);

        let newLvlIndices = [...lvlIndices];
        newLvlIndices[currIndex] = 0;
        const selectedLvls = getSelectedItems(wepLevelsData, newLvlIndices).map(lvl => +lvl.name.substring(1));
        setLvlIndices(newLvlIndices);

        let selectedAshes;

        if (newIndex > -1 && !weapons[newIndex].unique) {
            const availableAshes = getAvailableAshes(ashes, weapons[newIndex].type)
            const currentAshIndex = getAshIndex(availableAshes, weapons[newIndex].defaultSkill)
           
            let newAshIndices = [...ashIndices];
            newAshIndices[currIndex] = currentAshIndex;
            setAshIndices(newAshIndices);
            selectedAshes = getSelectedAshes(selectedWeapons, ashes, newAshIndices);
        }
        else {
            selectedAshes = getSelectedAshes(selectedWeapons, ashes, ashIndices);  
            setWepIndices(newIndices);
        }
        onWepChange(selectedWeapons, selectedAshes, selectedAffinities, selectedLvls);
    }

    const handleAshOnChange = (newIndex: number) => {
        let newIndices = [...ashIndices];
        newIndices[currIndex] = newIndex;
        setAshIndices(newIndices);

        const selectedWeapons = getSelectedItems(weapons, wepIndices);
        const selectedAshes = getSelectedAshes(selectedWeapons, ashes, newIndices);

        onAshChange(selectedAshes);
    }

    const handleAffOnChange = (newIndex: number) => {
        let newIndices = [...affIndices];
        newIndices[currIndex] = newIndex;
        setAffIndices(newIndices);

        const selectedAffinities = getSelectedItems(affinities, newIndices).map(aff => aff.name);
       
        onAffChange(selectedAffinities);
    }

    const handleLvlOnChange = (newIndex: number) => {
        let newIndices = [...lvlIndices];
        newIndices[currIndex] = newIndex;
        setLvlIndices(newIndices);

        const selectedLvls = getSelectedItems(wepLevelsData, newIndices).map(lvl => +lvl.name.substring(1));
        onLvlChange(selectedLvls);
    }

    const handleCheckboxChange = () => {
        setTwoHanded(!twoHanded);
        onTwoHandChange(!twoHanded);
    }

    for (let i = 0; i < 2; i++) {
        const condition = (i: number, j:number) => {
            if (i == 0) return j < 3;
            else return j >= 3;
        }

        selectorPanels.push(wepIndices.map((value, j) => (
            condition(i, j) &&
            <div className="selector" onClick={() => {setCurrIndex(j)}}>
                <label>{j < 3 ? "Left Armament " + (j % 3 + 1) : "Right Armament " + (j % 3 + 1)}</label>
                <DropDown items={weapons} index={wepIndices[j]} isNullable={true} onChange={handleWepOnChange} hasImages={true} searchEnabled={true}/>
                <div className="requirements-text" data-alt={isRequiredStatsMet(weapons[wepIndices[j]], totalStats, twoHanded).reqTitle}>
                {  
                    isRequiredStatsMet(weapons[wepIndices[j]], totalStats).isMet ? "" : 
                    isRequiredStatsMet(weapons[wepIndices[j]], totalStats, twoHanded).reqMessage
                }
                </div>
                <div className="weapon-options">
                    <div className="ashes">
                    { 
                        weapons[wepIndices[j]]?.unique || weapons[wepIndices[j]]?.disableAsh == true ? <DisabledDropDown value={weapons[wepIndices[j]].defaultSkill}/> :
                        wepIndices[j] < 0 ? <DisabledDropDown value={"Ash of War"} /> :
                        <DropDown items={getAvailableAshes(ashes, weapons[wepIndices[j]].type)} index={ashIndices[j]} isNullable={false} hasImages={false} onChange={handleAshOnChange} searchEnabled={true}/>
                    }
                    </div>
                    <div className="affinity">
                        {
                            weapons[wepIndices[j]]?.changeAffinity ?
                            <DropDown items={affinities} index={affIndices[j]} isNullable={false} hasImages={false} onChange={handleAffOnChange} /> :
                            <DisabledDropDown value={"Affinity"} />
                        }
                    </div>
                    <div className="levels">
                        {
                            wepIndices[j] > -1 && !weapons[wepIndices[j]]?.unique ? <DropDown items={wepLevelsData} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                            wepIndices[j] > -1 && weapons[wepIndices[j]].unique ? <DropDown items={wepLevelsData.slice(0, 11)} index={lvlIndices[j]} isNullable={false} hasImages={false} onChange={handleLvlOnChange} /> :
                            <DisabledDropDown value={"+0"} />
                        }
                    </div>
                </div>
                <br/>
            </div>
        )));
    }

    return (
        <>
        <PanelTitle text="Weapons" img="icons/weapons.png"/>
        <div className="weapons-panel">
            {/* div for selecting weapons*/}
                <div className="selectors-container">
                    { selectorPanels[0] } <br/>  
                    <div className="checkbox-container" onClick={handleCheckboxChange}>
                        <input type="checkbox" checked={twoHanded} onChange={handleCheckboxChange}/>
                        Two-Handed
                    </div>
                </div>
                <div className="selectors-container"> { selectorPanels[1] } </div>
        </div>
        </>
    )
}

export default WeaponsPanel

