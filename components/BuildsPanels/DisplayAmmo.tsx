import { Ammo } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem"
import { calculateAmmoAttackPower } from "@/helpers/AmmoPanelHelper"

interface Props {
    selectedArrows: Ammo[],
    selectedBolts: Ammo[]
}

function DisplayAmmo({selectedArrows, selectedBolts} : Props) {
    return (
        <div>
            <PanelTitle text="Ammo" img="/icons/ammo.png"/>
            <div className="ammo-panel">
                {
                    selectedArrows.map((arrow, i) => { 
                        const ammoAP = calculateAmmoAttackPower(arrow);
                        return (
                        <div className="selector" key={i}>
                            <label>Arrow {i + 1}</label>
                            <ListItem image={arrow?.image} text={arrow?.name}/>
                            <div className="info">
                            <span className="ammo-effect">{arrow?.effect && "Effect: " + arrow.effect}</span>
                            <span className="ammo-ap"  data-alt={ammoAP?.apAlt}>{ammoAP && "Attack Power: " + ammoAP.atkPower}</span>
                        </div>
                        </div>
                    )})
                }
                {
                    selectedBolts.map((arrow, i) => { 
                        const ammoAP = calculateAmmoAttackPower(arrow);
                        return (
                        <div className="selector" key={i}>
                            <label>Bolt {i + 1}</label>
                            <ListItem image={arrow?.image} text={arrow?.name}/>
                            <div className="info">
                            <span className="ammo-effect">{arrow?.effect && "Effect: " + arrow.effect}</span>
                            <span className="ammo-ap"  data-alt={ammoAP?.apAlt}>{ammoAP && "Attack Power: " + ammoAP.atkPower}</span>
                        </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default DisplayAmmo