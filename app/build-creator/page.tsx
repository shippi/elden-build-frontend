'use client'
import { useEffect, useState } from 'react'
import { ArmourPanel, CharacterPanel, TalismansPanel, Loading, WeaponsPanel, DefencesPanel, StatsPanel, AttackPowerPanel, GreatRunesPanel, AmmoPanel, SpellsPanel, FilePanel } from '@/components'
import { BuildCreatorContextProvider } from '@/context/BuildCreatorContext';
import useLoading from '@/hooks/useLoading';
import { AuthContextProvider } from '@/context/AuthContext';

function BuildCreator() {
    const { loaded } = useLoading();
    
    if (loaded) {
        return (
            <div className="build-creator">
                <div style={{height: "40px"}}></div>
                <AuthContextProvider>
                <BuildCreatorContextProvider>
                
                <div className="panels-container">    
                
                <h1>ELDEN RING BUILD CREATOR</h1>
                <div style={{height: "20px", width:"100%"}}/>
                <FilePanel/>
                <div className="separator" style={{width:"100%"}}/>
                    <div className="subcontainer">
                    <CharacterPanel/>
                    <div style={{height:"40px"}}/>
                    <GreatRunesPanel/>
                    </div>
                    <div className="subcontainer">
                        <WeaponsPanel/>
                        <div style={{height:"40px"}}/>
                        <div className='subcontainer2'>
                            <ArmourPanel/>
                            <TalismansPanel/>
                        </div>
                    </div>
                    <div className="subcontainer" >
                        <StatsPanel/>
                        <div style={{height:"40px"}}/>
                        <AttackPowerPanel/>
                        <div style={{height:"40px"}}/>
                        <DefencesPanel/>
                    </div>
                </div>
                <div className="separator" />
                <div className="bottom-panels-container">
                    <AmmoPanel/>
                    <div style={{width:"3vw"}}/>
                    <SpellsPanel/>
                </div>
                </BuildCreatorContextProvider>
                </AuthContextProvider>
            </div>
        );
    }
    else {
        return (
            <>
            <Loading/>
            </>
        )
    }
}

export default BuildCreator