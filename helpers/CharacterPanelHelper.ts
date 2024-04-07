/**
 * Calculates the number of runes needed to get to the next level.
 * @param level 
 * @returns 
 */
export function calculateRunesToLevelUp(level: number) {
    let x = ((level + 81) - 92) * 0.02;
    if (x < 0) x = 0;
    
    return ((x + 0.1) * ((level + 81)**2)) + 1;
}

/**
 * Calculates and returns the total number of runes needed to get to a specified level.
 * @param classLevel 
 * @param totalLevel 
 * @returns 
 */
export function calculateTotalRunes(classLevel: number, totalLevel: number) {
    let total = 0;
    for (let i = classLevel; i < totalLevel; i++) {
        total += calculateRunesToLevelUp(i);
    }
    return Math.floor(total);
}