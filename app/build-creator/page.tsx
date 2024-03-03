'use client'
import { useState } from 'react'
import { CharacterPanel, Loading } from '@/components'
import { useFetchAllItems } from '@/hooks';

function BuildCreator() {
    const { classes, isLoading, error } = useFetchAllItems();
    const [ classIndex, setClassIndex ] = useState(0);

    if (classes.length > 0 && !isLoading) {
        return (
            <div className="build-creator">
                <div className="panels-container">
                    <h1>ELDEN RING BUILD CREATOR</h1>
                    <br />
                    <CharacterPanel classes={classes} index={classIndex} onChange={setClassIndex}/>
                </div>     
            </div>
        )
    }
    else {
        return (
            <Loading />
        )
    }
}

export default BuildCreator