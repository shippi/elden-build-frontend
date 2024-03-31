import { classes } from "@/public/data";
import { Ammo, Armour, Ash, CharacterStats, GreatRune, Spell, Talisman, Weapon } from "@/utils/types";
import { PropsWithChildren, createContext, useState } from "react";

export const BuildCreatorContext = createContext<any>(undefined);

export const BuildCreatorContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [buildName, setBuildName] = useState("Untitled");

    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedArmours, setSelectedArmours] = useState<Armour[]>(new Array(4).fill(undefined));
    const [selectedTalismans, setSelectedTalismans] = useState<Talisman[]>([]);
    const [selectedWeapons, setSelectedWeapons] = useState<Weapon|null[]>(new Array(6).fill(null));
    const [selectedAshes, setSelectedAshes] = useState<Ash|null[]>(new Array(6).fill(null));
    const [selectedWepLvls, setSelectedWepLvls] = useState<any[]>(new Array(6).fill(null));
    const [selectedAffinities, setSelectedAffinities] = useState<any[]>([]);
    const [selectedRune, setSelectedRune] = useState<GreatRune|undefined>(undefined);
    const [selectedArrows, setSelectedArrows] = useState<Ammo|null[]>([]);
    const [selectedBolts, setSelectedBolts] = useState<Ammo|null[]>([]);
    const [selectedSpells, setSelectedSpells] = useState<Spell|null[]>([]);
    const [twoHanded, setTwoHanded] = useState(false);
    const [runeActivated, setRuneActivated] = useState(false);
    const [characterStats, setCharacterStats] = useState<CharacterStats>({
        vigor: 0, 
        mind: 0, 
        endurance: 0, 
        strength: 0, 
        dexterity: 0, 
        intelligence: 0, 
        faith: 0, 
        arcane: 0
    });
    
    const runeEffect = runeActivated ? selectedRune : undefined;
    
    const value = {
        buildName, 
        setBuildName,
        selectedClass,
        setSelectedClass,
        selectedArmours,
        setSelectedArmours,
        selectedTalismans,
        setSelectedTalismans,
        selectedWeapons,
        setSelectedWeapons,
        selectedAshes, 
        setSelectedAshes,
        selectedWepLvls, 
        setSelectedWepLvls,
        selectedAffinities, 
        setSelectedAffinities,
        selectedRune, 
        setSelectedRune,
        selectedArrows, 
        setSelectedArrows,
        selectedBolts, 
        setSelectedBolts,
        selectedSpells, 
        setSelectedSpells,
        twoHanded, 
        setTwoHanded,
        runeActivated, 
        setRuneActivated,
        characterStats, 
        setCharacterStats,
        runeEffect
    }

    return (
        <BuildCreatorContext.Provider value={value}>
            {children}
        </BuildCreatorContext.Provider>
    )
}

export default BuildCreatorContext;