import { useEffect } from "react";

/**
 * Custom hook that triggers when the browser window changes size.
 * @param handler 
 */
export default function useWindowSizeChange(handler: any) {
    useEffect(() => {
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        }
    }, [])
}