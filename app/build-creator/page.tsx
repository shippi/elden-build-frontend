'use client'

import React, { useState } from 'react'
import { CharacterPanel } from '@/components'
import useFetchClasses from '@/hooks/useFetchClasses()';

function BuildCreator() {
    const { classes, isLoading, error } = useFetchClasses();
    const [ classIndex, setClassIndex ] = useState(0);

    if (classes.length > 0) {
        return (
            <div className="build-creator">
                <div className="panels-container">
                    <h1>ELDEN RING BUILD CREATOR</h1>
                    <CharacterPanel classes={classes} currentIndex={classIndex}/>
                </div>     
            </div>
        )
    }
    else {
        return (
            <div className="loading-screen">
                loading...
            </div>
        )
    }
}

export default BuildCreator