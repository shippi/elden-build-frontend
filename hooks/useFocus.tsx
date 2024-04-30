import { RefObject } from "react"

export default function useFocus(ref: RefObject<HTMLInputElement>) {
    const setFocus = () => { if(ref.current) {
        ref.current.focus();
    }}
    return { setFocus }
}