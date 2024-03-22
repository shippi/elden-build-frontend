import { useEffect } from "react";

export default function useOnKeyPress(targetKey: string, callback: Function) {
    useEffect(() => {
        const keyHandler = (event: globalThis.KeyboardEvent) => {
            if (event.key == targetKey) callback();
        }
        window.addEventListener('keydown', keyHandler);
        return () => {
            window.removeEventListener('keydown', keyHandler);
        }
    })
}