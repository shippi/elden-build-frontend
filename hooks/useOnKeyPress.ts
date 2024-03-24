import { useEffect } from "react";

export default function useOnKeyPress(targetKey: string[], callback: Function) {
    useEffect(() => {
        const keyHandler = (event: globalThis.KeyboardEvent) => {
            if (targetKey.includes(event.key)) callback();
        }
        window.addEventListener('keydown', keyHandler);
        return () => {
            window.removeEventListener('keydown', keyHandler);
        }
    })
}