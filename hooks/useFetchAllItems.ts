import { useEffect, useState } from "react";

/**
 * Used to fetch all the necessary elden ring data for the build planner.
 * VERY UGLY CODE WILL NEED TO REDO IN THE FUTURE BUT IT WORKS THO
 * @returns 
 */
export default function useFetchAllItems() {
    const LIMIT: number = 9999;
    const LS_PREFIX = "elden-ring-";
    const [classes, setClasses] = useState([]);
    const [armours, setArmours] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [shields, setShields] = useState([])
    const [talismans, setTalismans] = useState([]);
    const [ashes, setAshes] = useState([]);
    const [sorceries, setSorceries] = useState([]);
    const [ammos, setAmmos] = useState([]);
    const [spirits, setSpirits] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const allLoaded = () => {
        if (window.localStorage.getItem(LS_PREFIX + "classes") != null &&
            window.localStorage.getItem(LS_PREFIX + "armours") != null &&
            window.localStorage.getItem(LS_PREFIX + "weapons") != null &&
            window.localStorage.getItem(LS_PREFIX + "shields") != null &&
            window.localStorage.getItem(LS_PREFIX + "talismans") != null &&
            window.localStorage.getItem(LS_PREFIX + "ashes") != null &&
            window.localStorage.getItem(LS_PREFIX + "sorceries") != null &&
            window.localStorage.getItem(LS_PREFIX + "ammos") != null &&
            window.localStorage.getItem(LS_PREFIX + "spirits") != null) 
            return true;
        else
            return false;
    }

    useEffect(() => {
        const handleFetchAllItems = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                if (allLoaded() == false) {
                    // fetch classes
                    let res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'classes?limit=10', { method: 'GET' });
                    let data = await res.json();        
                    setClasses(data.data);
                    window.localStorage.setItem(LS_PREFIX + "classes", JSON.stringify(data.data))
                    // fetch armours
                    res = await fetch('https://elden-ring-api-seven.vercel.app/api/armors?limit=999', { method: 'GET' });
                    data = await res.json();       
                    setArmours(data.data);
                    window.localStorage.setItem(LS_PREFIX + "armours", JSON.stringify(data.data))
                    // fetch weapons
                    res = await fetch('https://elden-ring-api-seven.vercel.app/api/weapons?limit=999', { method: 'GET' });
                    data = await res.json();        
                    setWeapons(data.data);
                    window.localStorage.setItem(LS_PREFIX + "weapons", JSON.stringify(data.data));
                    // fetch talismans
                    res = await fetch("https://elden-ring-api-seven.vercel.app/api/talismans?limit=999", { method: 'GET' });
                    data = await res.json();        
                    setTalismans(data.data);
                    window.localStorage.setItem(LS_PREFIX + "talismans", JSON.stringify(data.data))
                    // fetch ashes
                    res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'ashes?limit=' + LIMIT, { method: 'GET' });
                    data = await res.json();        
                    setAshes(data.data);
                    window.localStorage.setItem(LS_PREFIX + "ashes", JSON.stringify(data.data))
                    // fetch sorceries
                    res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'sorceries?limit=' + LIMIT, { method: 'GET' });
                    data = await res.json();        
                    setSorceries(data.data);
                    window.localStorage.setItem(LS_PREFIX + "sorceries", JSON.stringify(data.data))
                    // fetch ammos
                    res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'ammos?limit=' + LIMIT, { method: 'GET' });
                    data = await res.json();        
                    setAmmos(data.data);
                    window.localStorage.setItem(LS_PREFIX + "ammos", JSON.stringify(data.data))
                    // fetch spirits
                    res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'spirits?limit=' + LIMIT, { method: 'GET' });
                    data = await res.json();        
                    setSpirits(data.data);
                    window.localStorage.setItem(LS_PREFIX + "spirits", JSON.stringify(data.data))
                }
                else {
                    setClasses(JSON.parse(window.localStorage.getItem(LS_PREFIX + "classes") || "{}"));
                    setArmours(JSON.parse(window.localStorage.getItem(LS_PREFIX + "armours") || "{}"));
                    setWeapons(JSON.parse(window.localStorage.getItem(LS_PREFIX + "weapons") || "{}"));
                    setShields(JSON.parse(window.localStorage.getItem(LS_PREFIX + "shields") || "{}"));
                    setTalismans(JSON.parse(window.localStorage.getItem(LS_PREFIX + "talismans") || "{}"));
                    setAshes(JSON.parse(window.localStorage.getItem(LS_PREFIX + "ashes") || "{}"));
                    setSorceries(JSON.parse(window.localStorage.getItem(LS_PREFIX + "sorceries") || "{}"));
                    setAmmos(JSON.parse(window.localStorage.getItem(LS_PREFIX + "ammos") || "{}"));
                    setSpirits(JSON.parse(window.localStorage.getItem(LS_PREFIX + "spirits") || "{}"));
                }
            }
            catch (e) {
                setError('Error: ' + e);
            }
            finally {
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 750)
                
            }
        };
        handleFetchAllItems();
    }, []);

    return { classes, armours, weapons, shields, talismans, ashes, sorceries, ammos, spirits, isLoading, error };
}