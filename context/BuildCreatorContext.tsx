import { classes } from "@/public/data";
import { Ammo, Armour, Ash, CharacterStats, GreatRune, Spell, Talisman, Weapon } from "@/helpers/types";
import { PropsWithChildren, createContext, useEffect, useRef, useState } from "react";

export const BuildCreatorContext = createContext<any>(undefined);

export const BuildCreatorContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [buildName, setBuildName] = useState("");

    const [selectedClass, setSelectedClass] = useState(classes[0]);
    const [selectedArmours, setSelectedArmours] = useState<Armour[]>(new Array(4).fill(null));
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
        
        
        if (JSON.stringify(previousBuild.current.currentBuild) == JSON.stringify(currentBuild)) {
            let saved = false;

            saveableDependencies.forEach((items, i) => {
                if (items && Object.entries(currentBuild)[i][1] && JSON.stringify(items) != JSON.stringify(Object.entries(currentBuild)[i][1])) {
                    setSaveable(true);
                    saved = true;
                }
            });
            
            if (!saved) setSaveable(false)
        }
        else {
            previousBuild.current.currentBuild = currentBuild;
            setSaveable(false);
        }
    }, [...saveableDependencies, currentBuild])


    const resetBuild = () => {
        setBuildName("");
        setSaveId(-1);
        setSelectedClass(classes[0]);
        setSelectedArmours(new Array(4).fill(null));
        setSelectedTalismans(new Array(4).fill(null));
        setSelectedWeapons(new Array(6).fill(null));
        setSelectedAshes(new Array(6).fill(null));
        setSelectedWepLvls(new Array(6).fill(0));
        setSelectedAffinities(new Array(6).fill("Standard"));
        setSelectedRune(undefined);
        setSelectedArrows(new Array(2).fill(null));
        setSelectedBolts(new Array(2).fill(null));
        setSelectedSpells(new Array(12).fill(null));
        setCharacterStats({
            vigor: 0, 
            mind: 0, 
            endurance: 0, 
            strength: 0, 
            dexterity: 0, 
            intelligence: 0, 
            faith: 0, 
            arcane: 0
        });
        setCurrentBuild({
            selectedClass: classes[0],
            selectedArmours: new Array(4).fill(null), 
            selectedTalismans: new Array(4).fill(null), 
            selectedWeapons: new Array(6).fill(null), 
            selectedAshes: new Array(6).fill(null), 
            selectedWepLvls: new Array(6).fill(0),
            selectedAffinities: new Array(6).fill("Standard"), 
            selectedRune: undefined,
            selectedArrows: new Array(2).fill(null), 
            selectedBolts: new Array(2).fill(null), 
            selectedSpells: new Array(12).fill(null), 
            characterStats: {
                vigor: 0, 
                mind: 0, 
                endurance: 0, 
                strength: 0, 
                dexterity: 0, 
                intelligence: 0, 
                faith: 0, 
                arcane: 0
            }
          });
        setSaveable(false);
    }

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
        setCurrentBuild,
        currentBuild,
        resetBuild
    }

    return (
        <BuildCreatorContext.Provider value={value}>
            {children}
        </BuildCreatorContext.Provider>
    )
}

export default BuildCreatorContext;