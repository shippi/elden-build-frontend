import { useEffect, useState } from "react";

export default function useLoading() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 1000);
    }, [loaded])

    return { loaded, setLoaded }
}