import { useEffect } from "react";

/**
 * Custom hook that triggers when user clicks outside of the specified ref.
 * @param ref 
 * @param callback 
 */
export default function useClickOutside(ref: any, callback: Function) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return;
            }
            callback(e);
        };
        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        }
    }); 
}