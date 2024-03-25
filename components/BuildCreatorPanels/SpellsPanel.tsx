'use client'
import { useState } from "react"
import { DropDown, PanelTitle } from ".."
import { Armour, CharacterClass, CharacterStats, GreatRune, Spell, Talisman } from "@/utils/types";
import { getSelectedItems, getTotalStats, handleDropdownChange, isRequiredStatsMet } from "@/utils/BuildCreatorUtils";
import { spells } from "@/public/data";

interface Props {
  armours: Armour[],
  talismans: Talisman[],
  characterClass: CharacterClass,
  characterStats: CharacterStats,
  greatRune?: GreatRune
  onChange: Function
}


function SpellsPanel({armours, talismans, characterClass, characterStats, greatRune, onChange} : Props) {
  const [spellIndices, setSpellIndices] = useState(new Array(12).fill(-1));
  const [currIndex, setCurrIndex] = useState(0);

  const totalStats = getTotalStats(characterClass, characterStats, armours, talismans, false, greatRune);

  const handleSpellChange = (newIndex: number) => {
    handleDropdownChange(spellIndices, currIndex, newIndex, talismans, getSelectedItems, setSpellIndices, onChange);
  }
  
  return (
    <div>
    <PanelTitle text="Spells" img="icons/spells.png"/>
        <div className="spells-panel">
          {
            spellIndices.map((spellIndex, i) => {
              const moonOfNokstellaExists = talismans.find(talisman => talisman?.name == "Moon of Nokstella");
              let fpCost = 0;
              if (spells[spellIndex]) {
                fpCost = spells[spellIndex].fpCost;

                talismans.forEach(talisman => {
                  if (talisman?.statChanges?.fpCost) fpCost *= talisman.statChanges.fpCost
                });

                armours.forEach(armour => {
                  if (armour?.statChanges?.fpCost) fpCost *= armour.statChanges.fpCost
                });
              }
              
              if (!moonOfNokstellaExists && i < 10 || moonOfNokstellaExists)
                return (
                  <div className="selector" onClick={() => {setCurrIndex(i)}} key={i}>
                    <label>Spell {i+1}</label>
                    <DropDown items={spells} index={spellIndex} isNullable={true} hasImages={true} incompatibilities={spellIndices} onChange={handleSpellChange} searchEnabled={true}/>
                    <div className="info"> 
                      <div className="requirements-text" data-alt={isRequiredStatsMet(spells[spellIndices[i]]?.requirements, totalStats, false).reqTitle}>
                        {  
                          isRequiredStatsMet(spells[spellIndices[i]]?.requirements, totalStats).isMet ? "" : 
                          isRequiredStatsMet(spells[spellIndices[i]]?.requirements, totalStats, false).reqMessage
                        }
                      </div>
                      <div>
                        {
                          spells[spellIndex] && "FP Cost: " + Math.floor(fpCost)
                        }
                      </div>
                    </div>

                  </div>
                )
            })
          }
        </div>
    </div>
  )
}

export default SpellsPanel