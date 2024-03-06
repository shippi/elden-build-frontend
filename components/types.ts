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
    name: string,
    amount: number
}

export interface Armour {
    id: string,
    name: string,
    category: string,
    dmgNegation: DamageNegation[],
    resistance: DamageNegation[],
    specialEffect: string
}
