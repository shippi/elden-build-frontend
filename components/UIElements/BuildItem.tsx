'use client'

import { calculateLevel, getItemFromName } from "@/helpers/BuildCreatorHelper";
import { Armour, Item, Talisman, Weapon } from "@/helpers/types";
import { classes, armours, talismans, weapons, greatRunes, arrows, bolts, spells } from "@/public/data";
import { crystalTears } from "@/public/data/Equipment/crystalTears";
import Link from "next/link";
import { useEffect, useState } from "react"

interface Props {
    build: any
}

function BuildItem({ build } : Props) {
    const [creatorName, setCreatorName] = useState("");
    const [viewCount, setViewCount] = useState("");

    const selectedClass = getItemFromName(build.build.selectedClass, classes);
    const selectedArmours = build.build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedWeapons = build.build.selectedWeapons.map((weapon: string) => getItemFromName(weapon, weapons));
    const selectedTalismans = build.build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    const selectedSpells = build.build.selectedSpells.map((spell: string) => getItemFromName(spell, spells));
    const characterStats = build.build.characterStats;
   
    const level = calculateLevel(selectedClass.stats.level, characterStats);
    const date = new Date(build.updated_at);

    useEffect(() => {
        const getCreatorName = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${build.uid}`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setCreatorName(data[0].username))
            .catch(error => {})
        }
        
        const getViewCount = async(build: any) => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `builds/${build.id}/view-count`)
            .then(res => {
                if (!res.ok) throw Error;
                return res.json();
            }) 
            .then(data => setViewCount(data.count))
            .catch(error => {})
        }

        getCreatorName(build);
        getViewCount(build);
    }, []);

    return (
        <Link href={`/builds/${build.id}`} target="_blank">
        <div className="build-item">
            
            <h3>
            
            {
            build.name.length < 40 ?
            build.name 
            :
            build.name.slice(0, 40) + "..."
            }
            
            </h3>
            
            <div style={{display: "flex"}}>
                Created by <div style={{width: "5px"}}/>
                <strong>
                {creatorName}
                </strong>
                , updated on <div style={{width: "5px"}}/>
                {date.toLocaleString().split(",")[0]}
            </div>
            <div className="separator"/>
            <div className="equipment">
                <div className="armours">
                    {
                        selectedArmours.map((armour: Armour) => (
                            armour ?
                            <img src={armour.image}/>
                            :
                            <div className="blank"/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="talismans">
                    {
                        selectedTalismans.map((talisman: Talisman) => (
                            talisman ?
                            <img src={talisman.image}/>
                            :
                            <div className="blank"/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="weapons">
                    {
                        selectedWeapons.map((weapon: Weapon) => (
                            weapon ?
                            <img src={weapon.image}/>
                            :
                            <div className="blank"/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="spells">
                    {
                        selectedSpells.map((spell: Item) => (
                            spell ?
                            <img src={spell.image}/>
                            :
                            <div className="blank"/>
                        ))
                    }
                </div>
            </div>
            <label>Total Level: <span style={{color: "white"}}>{level}</span></label>
            <div className="separator"/>
            <div style={{display: "flex", color: "lightgray"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <i className="fa fa-eye fa-lg"/> &nbsp; 
                    <label>{viewCount}</label>
                </div>
            </div>
        </div>
        </Link>
  )
}

export default BuildItem