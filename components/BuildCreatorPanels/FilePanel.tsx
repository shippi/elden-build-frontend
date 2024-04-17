'use client'
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext, useEffect } from "react"
import { armours, arrows, ashes, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data";
import { getItemFromName } from "@/helpers/BuildCreatorHelper";
import { crystalTears } from "@/public/data/Equipment/crystalTears";
import { FilePanelContext } from "@/context/FilePanelContext";
import { BuildNameInput, ConfirmationModal, DeleteButton, NewButton, SaveButton, VisibilityToggle } from "@/components";

function FilePanel() {
  const { setSelectedClass, setSelectedArmours, setSelectedTalismans, setSelectedWeapons, setSelectedAshes, setSelectedWepLvls, setSelectedAffinities, setSelectedRune, setSelectedTears, setSelectedArrows, setSelectedBolts, 
          setSelectedSpells, setCharacterStats, setIsPublic, loadingBuild, setLoadingBuild, setSaveable, saveId, setCurrentBuild, resetBuild } 
         = useContext(BuildCreatorContext);
 
  const { saveLoading, message, setMessage, isError, setIsError, selectedIndex, setSelectedIndex, builds,  selectToggle, confirmationOpen} = useContext(FilePanelContext);

  useEffect(() => {
    setSelectedIndex(builds.findIndex((build: any) => build.id == saveId));
  }, [builds]);

	useEffect(() => {
		setIsError(false);
		setMessage("");
	}, [saveLoading, loadingBuild]);

  useEffect(() => {
    if (builds[selectedIndex]) {
      const selectedBuild = builds[selectedIndex].build
      setCharacterStats(selectedBuild.characterStats);
      setSelectedClass(getItemFromName(selectedBuild.selectedClass, classes));
      setSelectedArmours(selectedBuild.selectedArmours.map((armour: string) => getItemFromName(armour, armours)));
      setSelectedTalismans(selectedBuild.selectedTalismans.map((name: string) => getItemFromName(name, talismans)));
      setSelectedWeapons(selectedBuild.selectedWeapons.map((name: string) => getItemFromName(name, weapons)));
      setSelectedRune(getItemFromName(selectedBuild.selectedRune, greatRunes));
      setSelectedTears(selectedBuild.selectedTears.map((name: string) => getItemFromName(name, crystalTears)));
      setSelectedAshes(selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)));
      setSelectedAffinities(selectedBuild.selectedAffinities);
      setSelectedWepLvls(selectedBuild.selectedWepLvls);
      setSelectedArrows(selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)));
      setSelectedBolts(selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)));
      setSelectedSpells(selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)));
      setIsPublic(builds[selectedIndex].is_public);
      
      setCurrentBuild({
        selectedClass: getItemFromName(selectedBuild.selectedClass, classes),
        selectedArmours: selectedBuild.selectedArmours.map((armour: string) => getItemFromName(armour, armours)), 
        selectedTalismans: selectedBuild.selectedTalismans.map((name: string) => getItemFromName(name, talismans)), 
        selectedWeapons: selectedBuild.selectedWeapons.map((name: string) => getItemFromName(name, weapons)), 
        selectedAshes: selectedBuild.selectedAshes.map((name: string) => getItemFromName(name, ashes)), 
        selectedWepLvls: selectedBuild.selectedWepLvls,
        selectedAffinities: selectedBuild.selectedAffinities, 
        selectedRune: getItemFromName(selectedBuild.selectedRune, greatRunes),
        selectedTears: selectedBuild.selectedTears.map((name: string) => getItemFromName(name, crystalTears)), 
        selectedArrows: selectedBuild.selectedArrows.map((name: string) => getItemFromName(name, arrows)), 
        selectedBolts: selectedBuild.selectedBolts.map((name: string) => getItemFromName(name, bolts)), 
        selectedSpells: selectedBuild.selectedSpells.map((name: string) => getItemFromName(name, spells)), 
        characterStats: selectedBuild.characterStats,
        isPublic: builds[selectedIndex].is_public
      });
    }
    else {
      resetBuild();
    }
    setSaveable(false);
    setTimeout(() => setLoadingBuild(false), 750);
  }, [selectToggle]);

  return (
    <>
    {confirmationOpen && <ConfirmationModal/>}
    <div className="file-panel">
			<BuildNameInput />
      <VisibilityToggle />
			<NewButton />
			<SaveButton />
			<DeleteButton />
      {message && <div className="message" style={{color: isError ? "red" : " white"}}>{message}</div>}
    </div>
    </>
  )
}

export default FilePanel
