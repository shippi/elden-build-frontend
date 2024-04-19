export interface Item {
    id: string,
    name: string,
    image?: string
}

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

export interface Armour extends Item {
    category: string,
    dmgNegation: DamageNegation,
    resistances: Resistances,
    poise: number,
    effect?: string,
    statChanges?: StatChange,
    weight: number
}

export interface Weapon extends Item {
    type: string,
    requiredAttributes: requiredAttributes,
    weight: number,
    changeAffinity: boolean,
    unique: boolean,
    disableAsh: boolean,
    defaultSkill: string,
    effect?: string
}

export interface Talisman extends Item {
    group: string,
    effect: string,
    statChanges?: StatChange,
    weight: number
}

export interface Ash extends Item {
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

export interface CrystalTear extends Item {
    statChanges?: StatChange
    effect: string
}


export interface Ammo extends Item {
    attackPower: {
        physical?: number,
        magic?: number,
        fire?: number,
        lightning?: number,
        holy?: number
    },
    effect?: string
}

export interface Spell extends Item {
    requirements: requiredAttributes,
    fpCost: number
}

export interface Build {
    class: CharacterClass,
    armours: Armour | null [],
    talismans: Talisman | null [],
    weapons: Weapon | null [],
    wepLvls: number[],
    affinities: string[],
    rune: GreatRune | null,
    arrows: Ammo | null [],
    bolts: Ammo | null [],
    spells: Spell | null [],
    stats: CharacterStats
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
