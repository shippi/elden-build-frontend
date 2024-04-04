'use client'
import BuildCreator from '@/components/BuildCreatorPanels/BuildCreator';
import { BuildCreatorContextProvider } from '@/context/BuildCreatorContext';

export default function BuildCreatorPage() {
    return(
        <BuildCreatorContextProvider>
            <BuildCreator/>
        </BuildCreatorContextProvider>
    )
}

