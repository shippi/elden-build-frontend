export interface CharacterStats { 
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
    stats: CharacterStats
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
    image: string,
    category: string,
    dmgNegation: DamageNegation,
    resistance: Resistances,
    poise: number,
    effect?: string,
    statChanges?: StatChange,
    weight: number
}

export interface Weapon {
    id: string,
    name: string,
    attack: Stat[],
    defence: Stat[],
    scalesWith: ScalesWith[],
    requiredAttributes: Stat[],
    category: string,
    weight: number
}

export interface Talisman {
    id: string,
    group: string,
    name: string,
    effect: string,
    statChanges?: StatChange,
    incompatible?: string[],
    weight: number
}

interface Stat {
    name: string,
    amount: number
}

interface ScalesWith {
    name: string,
    scaling: string
}

interface StatChange {
    maxHp?: number,
    maxFp?: number,
    maxStamina?: number,
    maxEquipLoad?: number,
    maxPoise?: number,
    discovery?: number,
    physicalNegation?: number,
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
