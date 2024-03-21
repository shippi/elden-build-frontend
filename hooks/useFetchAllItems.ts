import { useEffect, useState } from "react";
import { affinitiesData, armorsData, ashesData, classesData, talismansData, weaponsData, arrowsData, boltsData } from "@/public/data";
import { greatRunesData } from "@/public/data/Equipment/greatRunes";

/**
 * Used to fetch all the necessary elden ring data for the build planner.
 * @returns 
 */
export default function useFetchAllItems() {
    const [classes, setClasses] = useState<any[]>([]);
    const [armours, setArmours] = useState<any[]>([]);
    const [weapons, setWeapons] = useState<any[]>([]);
    const [talismans, setTalismans] = useState<any[]>([]);
    const [ashes, setAshes] = useState<any[]>([]);
    const [affinities, setAffinities] = useState<any[]>([]);
    const [sorceries, setSorceries] = useState<any[]>([]);
    const [spirits, setSpirits] = useState<any[]>([]);
    const [greatRunes, setGreatRunes] = useState<any[]>([]);
    const [arrows, setArrows] = useState<any[]>([]);
    const [bolts, setBolts] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleFetchAllItems = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                setClasses(classesData.slice(0, 10));
                setArmours(armorsData);
                setWeapons(weaponsData);
                setTalismans(talismansData);
                setAshes(ashesData);
                setAffinities(affinitiesData);
                setGreatRunes(greatRunesData);
                setArrows(arrowsData);
                setBolts(boltsData);
            }
            catch (e) {
                setError('Error: ' + e);
            }
            finally {
                setTimeout(() => {
                    setIsLoading(false);  
                }, 750);
            }
        };
        handleFetchAllItems();
    }, []);

    return { classes, armours, weapons, talismans, ashes, affinities, sorceries, arrows, bolts, spirits, greatRunes, isLoading, error };
}