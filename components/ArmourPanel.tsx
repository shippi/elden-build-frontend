import { DropDown } from "."

interface DamageNegation {
    name: string,
    amount: number
}

interface Armour {
    id: string,
    name: string,
    category: string,
    dmgNegation: DamageNegation[]
}

interface ArmourIndices {
    helm: number,
    chest: number,
    gauntlets: number,
    legs: number
}

interface Props {
    armours: Armour[],
    indices: ArmourIndices,
    onChange: Function
}


function ArmourPanel({armours, indices, onChange} : Props) {
    const helms = [...armours].filter(armour => (armour.category == "Helm"))
    const chestArmours = [...armours].filter(armour => (armour.category == "Chest Armor"))
    const gauntlets = [...armours].filter(armour => (armour.category == "Gauntlets"))
    const legArmours = [...armours].filter(armour => (armour.category == "Leg Armor"))

    const onHelmChange = (i: number) => {
        onChange({...indices, helm: i});
    }
    const onChestChange = (i: number) => {
        onChange({...indices, chest: i});
    }
    const onGauntletChange = (i: number) => {
        onChange({...indices, gauntlets: i});
    }
    const onLegChange = (i: number) => {
        onChange({...indices, legs: i});
    }

    return (
        <div className="armour-panel">
            {/* div for selecting chest armour */}
            <div className="">
                <label>Helmet </label>
                <DropDown items={helms} index={indices.helm} isNullable={true} onChange={onHelmChange}/>
            </div>

            {/* div for selecting chest armour */}
            <div className="">
                <label>Chest </label>
                <DropDown items={chestArmours} index={indices.chest} isNullable={true} onChange={onChestChange}/>
            </div>

            {/* div for selecting chest armour */}
            <div className="">
                <label>Gauntlets </label>
                <DropDown items={gauntlets} index={indices.gauntlets} isNullable={true} onChange={onGauntletChange}/>
            </div>

            {/* div for selecting chest armour */}
            <div className="">
                <label>Gauntlets </label>
                <DropDown items={legArmours} index={indices.legs} isNullable={true} onChange={onLegChange}/>
            </div>
        </div>
    )
}

export default ArmourPanel