import { Weapon } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import ListItem from "../UIElements/ListItem";

interface Props {
    selectedWeapons: Weapon[],
    selectedAffinities: string[],
    selectedAshes: string[],
    selectedLevels: number[]
}

function DisplayWeapons({selectedWeapons, selectedAffinities, selectedAshes, selectedLevels} : Props) {
    const selectorPanels = [];

    for (let i = 0; i < 2; i++) {
        const condition = (i: number, j:number) => {
            if (i == 0) return j < 3;
            else return j >= 3;
        }

        selectorPanels.push(selectedWeapons.map((weapon, j) => (
            condition(i, j) &&
            <div className="selector" key={j}>
                <label>{j < 3 ? "Left Armament " + (j % 3 + 1) : "Right Armament " + (j % 3 + 1)}</label>
                <ListItem image={weapon?.image} text={weapon?.name}/>
                {
                    weapon &&
                    <div className="weapon-options">
                        <div style={{width: "190px"}}>
                            <label>Ash of War</label>
                            {selectedAshes[j] ? selectedAshes[j] : weapon?.defaultSkill}
                            </div>
                        <div>
                        <label>Affinity</label>
                        {selectedAffinities[j]}
                        </div>
                        <div>
                        <label>Level</label>
                        {"+" + selectedLevels[j]}
                        </div>
                        
                    </div>
                    
                }
                <br/>
            </div>
        )));
    }
    return (
        <div>
            <PanelTitle text="Weapons" img="/icons/weapons.png"/>
            <div className="weapons-panel">
                <div className="selectors-container">
                    { selectorPanels[0] } 
                </div>
                <div className="selectors-container">
                    { selectorPanels[1] } 
                </div>
            </div>
        </div>

    )
}

export default DisplayWeapons