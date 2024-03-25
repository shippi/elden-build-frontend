import { useEffect, useState } from "react";

export default function useLoading() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [loaded])

    return { loaded, setLoaded }
}