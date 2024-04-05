import { useEffect, useState } from "react";

/**
 * Custom hook used for the build creator page.
 * Forces a 1s loading screen when opening the build creator page.
 * @returns 
 */
export default function useLoading() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1000);
    }, [loaded])

    return { loaded, setLoaded }
}