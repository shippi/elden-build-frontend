'use client'
import { useState } from "react"
import { DropDown, PanelTitle } from ".."
import { Armour, CharacterClass, CharacterStats, GreatRune, Spell, Talisman } from "@/utils/types";
import { getSelectedItems } from "@/utils/BuildCreatorUtils";
import { talismansData } from "@/public/data";

interface Props {
  spells: Spell[],
  characterClass: CharacterClass,
  characterStats: CharacterStats,
  armours: Armour[],
  talismans: Talisman[],
  twoHanded: boolean, 
  greatRune?: GreatRune,
  onChange: Function
}


function SpellsPanel({spells, talismans, onChange} : Props) {
  const [spellIndices, setSpellIndices] = useState(new Array(12).fill(-1));
  const [currIndex, setCurrIndex] = useState(0);
  console.log(spells)
  const handleSpellChange = (newIndex: number) => {
      let newIndices = [...spellIndices];
      newIndices[currIndex] = newIndex;

      const selectedSpells = getSelectedItems(spells, newIndices);

      setSpellIndices(newIndices);
      onChange(selectedSpells);
  }

  return (
    <div>
    <PanelTitle text="Spells" img="icons/spells.png"/>
        <div className="spells-panel">
          {
            spellIndices.map((spellIndex, i) => {
              const moonOfNokstellaExists = talismans.find(talisman => talisman?.name == "Moon of Nokstella");
              if (!moonOfNokstellaExists && i < 10 || moonOfNokstellaExists)
                return (
                  <div className="selector" onClick={() => {setCurrIndex(i)}}>
                          <label>Spell {i+1}</label>
                          <DropDown items={spells} index={spellIndex} isNullable={true} hasImages={true} incompatibilities={spellIndices} onChange={handleSpellChange} searchEnabled={true}/>
                  </div>
                )
            })
          }
        </div>
    </div>
  )
}

export default SpellsPanel