'use client'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel, FilePanel, PhysickPanel } from '@/components'
import BuildCreatorContext from '@/context/BuildCreatorContext';
import { FilePanelContextProvider } from '@/context/FilePanelContext';
import { useContext, useEffect } from 'react';


function BuildCreator() {
    const { loadingBuild } = useContext(BuildCreatorContext);


    return (
        <div className="build-creator">
            <div style={{height: "40px"}}></div>
            <div className="panels-container" style={{zIndex: "2"}}>
                <h1>ELDEN RING BUILD CREATOR</h1>
                <div style={{height: "20px", width:"100%"}}/>
                <FilePanelContextProvider>
                    <FilePanel/>
                </FilePanelContextProvider>
                <div className="separator" style={{width:"100%"}}/>
            </div>
            {
                !loadingBuild ?
                <>
                <div className="panels-container">    
                <div className="subcontainer">
                    <CharacterPanel/>
                    <GreatRunesPanel/>
                    <PhysickPanel/>
                </div>

                <div className="subcontainer">
                    <WeaponsPanel/>

                    <div className='subcontainer2'>
                        <ArmourPanel/>
                        <TalismansPanel/>
                    </div>
                </div>
                <div className="subcontainer" >
                    <StatsPanel/>

                    <AttackPowerPanel/>

                    <DefencesPanel/>
                </div>
            </div>
            <div className="separator" />
            <div className="bottom-panels-container">
                <AmmoPanel/>
                <div style={{width:"3vw"}}/>
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