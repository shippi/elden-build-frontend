import { useEffect } from "react";

export default function useWindowSizeChange(handler: any) {
    useEffect(() => {
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        }
    }, [])
}