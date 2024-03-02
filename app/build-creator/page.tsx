'use client'

import React, { useState } from 'react'
import { CharacterPanel } from '@/components'
import useFetchAllItems from '@/hooks/useFetchAllItems';

function BuildCreator() {
    const { classes, isLoading, error } = useFetchAllItems();
    const [ classIndex, setClassIndex ] = useState(0);

    if (classes.length > 0) {
        return (
            <div className="build-creator">
                <div className="panels-container">
                    <h1>ELDEN RING BUILD CREATOR</h1>
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex}/>
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