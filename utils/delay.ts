/**
 * Function used to set delay until executing the next instruction.
 * @param ms 
 * @returns 
 */
export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}