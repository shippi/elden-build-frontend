import { ATTACK_TYPES } from "./consts";
import { Ammo } from "./types";

export function calculateAmmoAttackPower(ammo: Ammo) {
    if (!ammo) return null;
    let total = 0;
    let apAlt = "Attack Power: "
    
    ATTACK_TYPES.forEach((type, i) => {
        let currVal = ammo?.attackPower[type as keyof typeof ammo.attackPower];
        if (currVal) {
            total += currVal;
            apAlt += "\n • " + (type.charAt(0).toUpperCase() + type.slice(1)) + ": " + currVal;
        }
        else apAlt += "\n • " + (type.charAt(0).toUpperCase() + type.slice(1)) + ": " + 0;
    })

    return {atkPower: total, apAlt: apAlt};
}