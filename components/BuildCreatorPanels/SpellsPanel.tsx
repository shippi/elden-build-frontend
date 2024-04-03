'use client'
import { useContext, useEffect, useState } from "react"
import { DropDown, PanelTitle } from ".."
import { Armour, CharacterClass, CharacterStats, GreatRune, Spell, Talisman } from "@/helpers/types";
import { getIndicesOfItems, getSelectedItems, getTotalStats, handleDropdownChange, isRequiredStatsMet } from "@/helpers/BuildCreatorHelper";
import { spells } from "@/public/data";
import BuildCreatorContext from "@/context/BuildCreatorContext";

function SpellsPanel() {
  const {selectedClass, selectedArmours, selectedTalismans, characterStats, runeEffect, selectedSpells, setSelectedSpells} = useContext(BuildCreatorContext);

  const [spellIndices, setSpellIndices] = useState(getIndicesOfItems(selectedSpells, spells));
  const [currIndex, setCurrIndex] = useState(0);

  const totalStats = getTotalStats(selectedClass, characterStats, selectedArmours, selectedTalismans, false, runeEffect);

  const handleSpellChange = (newIndex: number) => {
    handleDropdownChange(spellIndices, currIndex, newIndex, spells, getSelectedItems, setSpellIndices, setSelectedSpells);
  }
  
  return (
    <div>
    <PanelTitle text="Spells" img="icons/spells.png"/>
        <div className="spells-panel">
          {
            spellIndices.map((spellIndex, i) => {
              const moonOfNokstellaExists = selectedTalismans.find((talisman: Talisman) => talisman?.name == "Moon of Nokstella");
              let fpCost = 0;
              if (spells[spellIndex]) {
                fpCost = spells[spellIndex].fpCost;

                selectedTalismans.forEach((talisman: Talisman)=> {
                  if (talisman?.statChanges?.fpCost) fpCost *= talisman.statChanges.fpCost
                });

                selectedArmours.forEach((armour: Armour) => {
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