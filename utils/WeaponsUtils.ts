import { Ash, CharacterStats, Weapon } from "@/app/types";

export function getAvailableAshes(ashes: Ash[], wepType: string) {
    return ashes.filter(ash => ash.availability[wepType as keyof typeof ash.availability] == true);
}

export function getAshIndex(ashes: Ash[], ashName: string) {
    let index = 0;
    ashes.forEach((ash, i) => {
        if (ash.name == ashName) index = i
    })
    return index;
}

export function getSelectedAshes(weps: Weapon[], ashes: Ash[], ashIndices: number[]) {
    let selectedAshes = new Array(weps.length).fill(null);

    weps.forEach((wep, i) => {
        if (wep && !wep.unique) {
            selectedAshes[i] = getAvailableAshes(ashes, wep.type)[ashIndices[i]]
        }
    })

    return selectedAshes;
}

export function isRequiredStatsMet(weapon: Weapon, totalStats: CharacterStats) {
    if (weapon == undefined) return {isMet: false, reqMessage: null};

    const statNames = ["strength", "dexterity", "intelligence", "faith", "arcane"];
    let isMet = true;
    let reqMessage = "Requirements: "

    statNames.forEach((stat, i) => {
        const wepReq = weapon.requiredAttributes[stat as keyof typeof weapon.requiredAttributes];
        const currStat = totalStats[stat as keyof typeof totalStats];
        
        if (wepReq && currStat < wepReq) isMet = false;

        if (wepReq) reqMessage += wepReq + "/";
        else  reqMessage += "0/";
    });

    return { isMet: isMet, reqMessage: reqMessage.slice(0, -1)};
}