import { useEffect } from "react";

/**
 * Custom hook that triggers when the specified keys (targetKeys argument) are pressed down.
 * @param targetKeys 
 * @param callback 
 */
export default function useOnKeyPress(targetKeys: string[], callback: Function) {
    useEffect(() => {
        const keyHandler = (event: globalThis.KeyboardEvent) => {
            if (targetKeys.includes(event.key)) callback(); // executes callback if one of specified keys is pressed
        }
        window.addEventListener('keydown', keyHandler);
        return () => {
            window.removeEventListener('keydown', keyHandler);
        }
    })
}