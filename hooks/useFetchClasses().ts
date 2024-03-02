import { use, useEffect, useState } from "react";

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function useFetchClasses() {
    const LIMIT: number = 9999;

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

    useEffect(() => {
        const handleFetchClasses = async () => {
            await(delay(200))
            setIsLoading(true);
            setError(null);
            
            try {
                // fetch classes
                let res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'classes', { method: 'GET' });
                let data = await res.json();        
                setClasses(data.data);
                // fetch armours
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'armors?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setArmours(data.data);
                // fetch weapons
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'weapons?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setWeapons(data.data);
                // fetch shields
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'shields?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setShields(data.data);
                // fetch talismans
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'talismans?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setTalismans(data.data);
                // fetch ashes
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'ashes?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setAshes(data.data);
                // fetch sorceries
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'sorceries?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setSorceries(data.data);
                // fetch ammos
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'ammos?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setAmmos(data.data);
                // fetch spirits
                res = await fetch(process.env.NEXT_PUBLIC_ER_API + 'spirits?limit=' + LIMIT, { method: 'GET' });
                data = await res.json();        
                setSpirits(data.data);
            }
            catch (e) {
                setError('Error: ' + e);
            }
            finally {
                setIsLoading(false);
            }
        };
        handleFetchClasses();
    }, []);

    return { classes, armours, weapons, shields, talismans, ashes, sorceries, ammos, spirits, isLoading, error };
}