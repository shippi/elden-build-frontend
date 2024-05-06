'use client'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel, FilePanel, PhysickPanel } from '@/components'
import BuildCreatorContext from '@/context/BuildCreatorContext';
import { FilePanelContextProvider } from '@/context/FilePanelContext';
import { useContext, useEffect } from 'react';


function BuildCreator() {
    const { loadingBuild } = useContext(BuildCreatorContext);

    useEffect(() => {
        document.title =  "Elden Builder - Build Creator"
    }, [])

    return (
        <div className="build-creator">
            <div className="panels-container" style={{zIndex: "2"}}>
                <h1>ELDEN RING BUILD CREATOR</h1>
                <div style={{height: "20px", width:"100%"}}/>
                <FilePanelContextProvider>
                    <FilePanel/>
                </FilePanelContextProvider>
                <div className="separator"/>
            </div>
            {
                !loadingBuild ?
                <>
                <div className="panels-container">    
                <div className="left-hand subcontainer">
                    <CharacterPanel/>
                    <GreatRunesPanel/>
                    <PhysickPanel/>
                </div>
                <div className="middle subcontainer">
                    <WeaponsPanel/>
                    <div className='subcontainer2'>
                        <ArmourPanel/>
                        <TalismansPanel/>
                    </div>
                </div>
                <div className="right-hand subcontainer" >
                    <StatsPanel/>
                    <AttackPowerPanel/>
                    <DefencesPanel/>
                </div>
            </div>
            
            <div className="bottom-panels-container">
            <div className="separator"/>
                <AmmoPanel/>
                <SpellsPanel/>
                
            </div>
            <div style={{height:"30vh"}}/>
            </>:
                <div className="panels-container" style={{height: "60vh"}}> 
                <Loading/>
                </div>
            }

        </div>
    );
}

export default BuildCreator