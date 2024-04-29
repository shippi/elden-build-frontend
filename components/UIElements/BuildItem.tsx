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
    const creatorName = build.username;
    const viewCount = build.views;
    const [likesCount, setLikesCount] = useState(build.likes || 0);
    const [liked, setLiked] = useState(build.liked_by_user || false);

    const selectedClass = getItemFromName(build.build.selectedClass, classes);
    const selectedArmours = build.build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedWeapons = build.build.selectedWeapons.map((weapon: string) => getItemFromName(weapon, weapons));
    const selectedTalismans = build.build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    const selectedSpells = build.build.selectedSpells.map((spell: string) => getItemFromName(spell, spells));
    const characterStats = build.build.characterStats;
   
    const level = calculateLevel(selectedClass.stats.level, characterStats);
    const date = new Date(build.updated_at);
    
    const onLikeClicked = () => {
        if (liked) {
            setLikesCount(likesCount - 1);
        }
        else {
            setLikesCount(likesCount + 1)
        };

        setLiked(!liked);
    }

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
                        selectedArmours.map((armour: Armour, i: number) => (
                            armour ?
                            <img src={armour.image} key={i}/>
                            :
                            <div className="blank" key={i}/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="talismans">
                    {
                        selectedTalismans.map((talisman: Talisman, i: number) => (
                            talisman ?
                            <img src={talisman.image} key={i}/>
                            :
                            <div className="blank" key={i}/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="weapons">
                    {
                        selectedWeapons.map((weapon: Weapon, i: number) => (
                            weapon ?
                            <img src={weapon.image} key={i}/>
                            :
                            <div className="blank" key={i}/>
                        ))
                    }
                </div>
                <div style={{borderLeft: "1px solid gray", height:"80px"}}/>
                <div className="spells">
                    {
                        selectedSpells.map((spell: Item, i: number) => (
                            spell ?
                            <img src={spell.image} key={i}/>
                            :
                            <div className="blank" key={i}/>
                        ))
                    }
                </div>
            </div>
            <label>Total Level: <span style={{color: "white"}}>{level}</span></label>
            <div className="separator"/>
            <div style={{display: "flex", color: "lightgray", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <i className="fa fa-eye fa-lg"/> &nbsp; 
                    <label>{viewCount}</label>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <i className="fa fa-heart-o" onClick={onLikeClicked}/> &nbsp; 
                    <label>{likesCount}</label>
                </div>
            </div>
        </div>
        </Link>
  )
}

export default BuildItem