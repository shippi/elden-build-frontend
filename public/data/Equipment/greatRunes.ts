import { GreatRune } from "@/utils/types";

export const greatRunes: GreatRune[] = [
    {
        name: "Godrick's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/1/1f/ER_Icon_Key_Item_Great_Rune_Godrick's.png/",
        description: "Raises all attributes.",
        statChanges: {
            vigor: 5,
            mind: 5,
            endurance: 5,
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            faith: 5,
            arcane: 5
        }
    },
    {
        name: "Radahn's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/9/9c/ER_Icon_Key_Item_Great_Rune_Radahn's.png/",
        description: "Raises maximum HP, FP and Stamina.",
        statChanges: {
            maxHp: 1.15,
            maxFp: 1.15,
            maxStamina: 1.15
        }
    },
    {
        name: "Rykard's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/c/c6/ER_Icon_Key_Item_Great_Rune_Rykard's.png/",
        description: "Restores HP upon defeating enemies."
    },
    {
        name: "Morgott's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/f/f6/ER_Icon_Key_Item_Great_Rune_Morgott's.png/",
        description: "Greatly raises maximum HP",
        statChanges: {
            maxHp: 1.25
        }
    },
    {
        name: "Mohg's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/b/b0/ER_Icon_Key_Item_Great_Rune_Mohg's.png/",
        description: "Grants a blessing of blood to summoned phantoms, and imparts a Phantom Great Rune upon successful invasion."
    },
    {
        name: "Malenia's Great Rune",
        image: "https://static.wikia.nocookie.net/eldenring/images/a/a3/ER_Icon_Key_Item_Great_Rune_Malenia's.png/",
        description: "Reduces the healing power of Flask of Crimson Tears. Attacks made immediately after receiving damage will partially recover HP."
    }
]