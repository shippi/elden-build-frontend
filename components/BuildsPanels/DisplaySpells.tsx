import { Armour, CharacterClass, CharacterStats, CrystalTear, GreatRune, Spell, Talisman } from "@/helpers/types"
import PanelTitle from "../UIElements/PanelTitle"
import { useContext } from "react"
import { BuildPageContext } from "@/context/BuildPageContext"
import ListItem from "../UIElements/ListItem"
import { getTotalStats, isRequiredStatsMet } from "@/helpers/BuildCreatorHelper"

interface Props {
    selectedClass: CharacterClass,
    characterStats: CharacterStats,
    selectedTalismans: Talisman[],
    selectedArmours: Armour[],
    selectedTears: CrystalTear[],
    greatRune: GreatRune,
    selectedSpells: Spell[]
}

function DisplaySpells({selectedClass, characterStats, selectedTalismans, selectedArmours, greatRune, selectedTears, selectedSpells} : Props) {
    const { physickActivated, runeActivated } = useContext(BuildPageContext);
    const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeActivated ? greatRune : undefined, physickActivated ? selectedTears : undefined);
    return (
        <div>
            <PanelTitle text="Spells" img="/icons/spells.png"/>
            <div className="spells-panel">
                {
                    selectedSpells.map((spell, i) => {
                        const requirementsMet = isRequiredStatsMet(spell?.requirements, totalStats);
                        const moonOfNokstellaExists = selectedTalismans.find((talisman: Talisman) => talisman?.name == "Moon of Nokstella");
                        let fpCost = 0;
                        if (spell) {
                          fpCost = spell.fpCost;
          
                          selectedTears.forEach((tear: CrystalTear) => {
                            if (tear?.statChanges?.fpCost !== undefined && physickActivated) fpCost *= tear.statChanges.fpCost
                          });
                          selectedTalismans.forEach((talisman: Talisman)=> {
                            if (talisman?.statChanges?.fpCost) fpCost *= talisman.statChanges.fpCost
                          });
          
                          selectedArmours.forEach((armour: Armour) => {
                            if (armour?.statChanges?.fpCost) fpCost *= armour.statChanges.fpCost
                          });
          
                        }
                        if (!moonOfNokstellaExists && i < 10 || moonOfNokstellaExists)
                            return (
                                <div className="selector">
                                    <label>Spell {i + 1}</label>
                                    <ListItem image={spell?.image} text={spell?.name}/>
                                    <div className="info"> 
                                        <div className="requirements-text" data-alt={requirementsMet.reqTitle}>
                                        {  
                                            requirementsMet.isMet ? "" : 
                                            requirementsMet.reqMessage
                                        }
                                        </div>
                                    <div>
                                    {
                                        spell && "FP Cost: " + Math.floor(fpCost)
                                    }
                                    </div>
                                </div>
                            </div>
                        )}
                    )
                }
            </div>
        </div>
    )
}

export default DisplaySpells