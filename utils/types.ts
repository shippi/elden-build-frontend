export interface ClassStats { 
    level: string, 
    vigor: string, 
    mind: string, 
    endurance: string, 
    strength: string, 
    dexterity: string, 
    intelligence: string, 
    faith: string, 
    arcane: string
}

export interface CharacterClass {
    id: string,
    name: string,
    image: string,
    description: string,
    stats: ClassStats
}

export interface CharacterStats {
    vigor: number, 
    mind: number, 
    endurance: number, 
    strength: number, 
    dexterity: number, 
    intelligence: number, 
    faith: number, 
    arcane: number
}

export interface DamageNegation {
    physical: number,
    slash: number,
    strike: number,
    pierce: number,
    magic: number,
    fire: number,
    lightning: number,
    holy: number,
}

export interface Resistances {
    immunity: number,
    robustness: number,
    focus: number,
    vitality: number
}

export interface Armour {
    id: string,
    name: string,
    category: string,
    image?: string,
    dmgNegation: DamageNegation,
    resistances: Resistances,
    poise: number,
    effect?: string,
    statChanges?: StatChange,
    weight: number
}

export interface Weapon {
    id: string,
    name: string,
    type: string,
    image: string,
    requiredAttributes: requiredAttributes,
    weight: number,
    changeAffinity: boolean,
    unique: boolean,
    disableAsh: boolean,
    defaultSkill: string,
    effect?: string
}

export interface Talisman {
    id: string,
    group: string,
    name: string,
    image: string,
    effect: string,
    statChanges?: StatChange,
    weight: number
}

export interface Ash {
    id: string,
    name: string,
    availability: Availability
}

export interface Multipliers {
    id: string; 
    name: string; 
    physicalAtk: number; 
    magicAtk: number; 
    fireAtk: number; 
    lightningAtk: number; 
    holyAtk: number; 
    strengthScaling: number; 
    dexterityScaling: number; 
    intellectScaling: number; 
    faithScaling: number; 
    arcaneScaling: number;
}

export interface requiredAttributes {
    strength?: number,
    dexterity?: number,
    intelligence?: number,
    faith?: number,
    arcane?: number
}

export interface GreatRune {
    name: string,
    image: string,
    description: string,
    statChanges?: StatChange
}

export interface Ammo {
    id: string,
    name: string,
    image: string,
    attackPower: {
        physical?: number,
        magic?: number,
        fire?: number,
        lightning?: number,
        holy?: number
    },
    effect?: string
}

export interface Spell {
    id: string,
    name: string,
    image: string,
    requirements: requiredAttributes,
    fpCost: number
}

interface StatChange {
    maxHp?: number,
    maxFp?: number,
    maxStamina?: number,
    maxEquipLoad?: number,
    maxPoise?: number,
    discovery?: number,
    fpCost?: number,
    physicalNegation?: number,
    slashNegation?: number,
    strikeNegation?: number,
    pierceNegation?: number,
    magicNegation?: number,
    fireNegation?: number,
    lightningNegation?: number,
    holyNegation?: number,
    immunity?: number,
    robustness?: number,
    focus?: number,
    vitality?: number,
    vigor?: number,
    mind?: number,
    endurance?: number,
    strength?: number,
    dexterity?: number,
    intelligence?: number,
    faith?: number,
    arcane?: number
}

interface Availability {
    dagger: boolean,
    straightSword: boolean,
    greatsword: boolean,
    colossalSword: boolean,
    curvedSword: boolean,
    curvedGreatsword: boolean,
    katana: boolean,
    twinblade: boolean,
    thrustingBlade: boolean,
    heavyThrustingBlade: boolean,
    axe: boolean,
    greataxe: boolean,
    hammer: boolean,
    greatHammer: boolean,
    flail: boolean,
    spear: boolean,
    heavySpear: boolean,
    halberd: boolean,
    scythe: boolean,
    fist: boolean,
    claw: boolean,
    whip: boolean,
    colossalWeapon: boolean,
    lightBow: boolean,
    bow: boolean,
    greatbow: boolean,
    crossbow: boolean,
    ballista: boolean,
    staff: boolean,
    seal: boolean,
    smallShield: boolean,
    mediumShield: boolean,
    greatshield: boolean,
    torch: boolean
}
