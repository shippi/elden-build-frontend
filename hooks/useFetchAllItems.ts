import { useEffect, useState } from "react";
import { armorsData, ashesData, classesData, talismansData, weaponsData } from "@/public/data";
/**
 * Used to fetch all the necessary elden ring data for the build planner.
 * VERY UGLY CODE WILL NEED TO REDO IN THE FUTURE BUT IT WORKS THO
 * @returns 
 */
export default function useFetchAllItems() {
    const [classes, setClasses] = useState<any[]>([]);
    const [armours, setArmours] = useState<any[]>([]);
    const [weapons, setWeapons] = useState<any[]>([]);
    const [shields, setShields] = useState<any[]>([]);
    const [talismans, setTalismans] = useState<any[]>([]);
    const [ashes, setAshes] = useState<any[]>([]);
    const [sorceries, setSorceries] = useState<any[]>([]);
    const [ammos, setAmmos] = useState<any[]>([]);
    const [spirits, setSpirits] = useState<any[]>([]);

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
            }
            catch (e) {
                setError('Error: ' + e);
            }
            finally {
                
             
                setIsLoading(false);
              
                
            }
        };
        handleFetchAllItems();
    }, []);

    return { classes, armours, weapons, shields, talismans, ashes, sorceries, ammos, spirits, isLoading, error };
}