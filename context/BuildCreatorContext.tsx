import { classes } from "@/public/data";
import { Ammo, Armour, Ash, CharacterStats, GreatRune, Spell, Talisman, Weapon } from "@/helpers/types";
import { PropsWithChildren, createContext, useEffect, useRef, useState } from "react";

export const BuildCreatorContext = createContext<any>(undefined);

export const BuildCreatorContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [buildName, setBuildName] = useState("Untitled");

    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedArmours, setSelectedArmours] = useState<Armour[]>(new Array(4).fill(undefined));
    const [selectedTalismans, setSelectedTalismans] = useState<Talisman[]>(new Array(4).fill(null));
    const [selectedWeapons, setSelectedWeapons] = useState<Weapon|null[]>(new Array(6).fill(null));
    const [selectedAshes, setSelectedAshes] = useState<Ash|null[]>(new Array(6).fill(null));
    const [selectedWepLvls, setSelectedWepLvls] = useState<any[]>(new Array(6).fill(0));
    const [selectedAffinities, setSelectedAffinities] = useState<any[]>(new Array(6).fill("Standard"));
    const [selectedRune, setSelectedRune] = useState<GreatRune|undefined>(undefined);
    const [selectedArrows, setSelectedArrows] = useState<Ammo|null[]>(new Array(2).fill(null));
    const [selectedBolts, setSelectedBolts] = useState<Ammo|null[]>(new Array(2).fill(null));
    const [selectedSpells, setSelectedSpells] = useState<Spell|null[]>(new Array(12).fill(null));
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

    const [loadingBuild, setLoadingBuild] = useState(false);
    const [saveId, setSaveId] = useState<number>(-1);
    const [saveable, setSaveable] = useState(false);

    const [currentBuild, setCurrentBuild] = useState<any>({
        selectedClass: selectedClass,
        selectedArmours: selectedArmours, 
        selectedTalismans: selectedTalismans, 
        selectedWeapons: selectedWeapons, 
        selectedAshes: selectedAshes, 
        selectedWepLvls: selectedWepLvls,
        selectedAffinities: selectedAffinities, 
        selectedRune: selectedRune, 
        selectedArrows: selectedArrows, 
        selectedBolts: selectedBolts, 
        selectedSpells: selectedSpells, 
        characterStats: characterStats
    });
    const runeEffect = runeActivated ? selectedRune : undefined;


    const saveableDependencies = [selectedClass, selectedArmours, selectedTalismans, selectedWeapons, selectedAshes, 
            selectedWepLvls, selectedAffinities, selectedRune, selectedArrows, selectedBolts, 
            selectedSpells, characterStats];

    const previousBuild = useRef({currentBuild});

    useEffect(() => {
        let saved = false;
        if (JSON.stringify(previousBuild.current.currentBuild) == JSON.stringify(currentBuild)) {
            saveableDependencies.forEach((items, i) => {
                if (JSON.stringify(items) != JSON.stringify(Object.entries(currentBuild)[i][1])) {
                    setSaveable(true);
                    saved = true;
                }
            });
        }
        else {
            previousBuild.current.currentBuild = currentBuild;
            setSaveable(false);
        }

        if (!saved) setSaveable(false)
    }, saveableDependencies)


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
        runeEffect,
        loadingBuild,
        setLoadingBuild,
        saveId,
        setSaveId,
        saveable,
        setSaveable,
        setCurrentBuild
    }

    return (
        <BuildCreatorContext.Provider value={value}>
            {children}
        </BuildCreatorContext.Provider>
    )
}

export default BuildCreatorContext;