'use client'

import { AuthContext } from "@/context/AuthContext";
import { calculateLevel, getItemFromName } from "@/helpers/BuildCreatorHelper";
import { Armour, Item, Talisman, Weapon } from "@/helpers/types";
import { classes, armours, talismans, weapons, spells } from "@/public/data";
import Link from "next/link";
import { MouseEvent, useContext, useEffect, useState } from "react"

interface Props {
    build: any
}

function BuildItem({ build } : Props) {
    const { currentUser, setLoginOpened } = useContext(AuthContext);

    const [likesCount, setLikesCount] = useState(build.likes || 0);
    const [liked, setLiked] = useState(build.liked || false);
    const [bookmarked, setBookmarked] = useState(build.bookmarked || false);

    const creatorName = build.username;
    const viewCount = build.views || 0;

    const selectedClass = getItemFromName(build.build.selectedClass, classes);
    const selectedArmours = build.build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedWeapons = build.build.selectedWeapons.map((weapon: string) => getItemFromName(weapon, weapons));
    const selectedTalismans = build.build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    const selectedSpells = build.build.selectedSpells.map((spell: string) => getItemFromName(spell, spells));
    const characterStats = build.build.characterStats;
   
    const level = calculateLevel(selectedClass.stats.level, characterStats);
    const date = new Date(build.updated_at);

    useEffect(() => {
        setLiked(build.liked);
        setBookmarked(build.bookmarked);
    }, [build])

    const onLikeClicked = (event: MouseEvent) => {
        const addLike = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${currentUser.uid}/likes`, {
                method: "POST",
                headers: {
                    "Authorization" : `Bearer ${currentUser.accessToken}` 
                },
                body: JSON.stringify({
                    build_id: build.id
                })
            })
            .catch();
        }
        const removeLike = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${currentUser?.uid}/likes`, {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${currentUser.accessToken}` 
                },
                body: JSON.stringify({
                    build_id: build.id
                })
            })
            .catch();
        }

        event.preventDefault();

        if (!currentUser) {
            setLoginOpened(true);
            return;
        }

        if (liked) {
            removeLike();
            setLikesCount(likesCount - 1);
        }
        else {
            addLike();
            setLikesCount(likesCount + 1);
        };

        setLiked(!liked);
    }

    const onBookmarkClicked = (event: MouseEvent) => {
        event.preventDefault();

        const addBookmark = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${currentUser.uid}/bookmarks`, {
                method: "POST",
                headers: {
                    "Authorization" : `Bearer ${currentUser.accessToken}` 
                },
                body: JSON.stringify({
                    build_id: build.id
                })
            })
            .catch();
        }
        const removeBookmark = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `users/${currentUser?.uid}/bookmarks`, {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${currentUser.accessToken}` 
                },
                body: JSON.stringify({
                    build_id: build.id
                })
            })
            .catch();
        }

        if (!currentUser) {
            setLoginOpened(true);
            return;
        }

        if (bookmarked) {
            removeBookmark();
        }
        else {
            addBookmark();
        }

        setBookmarked(!bookmarked);
    }

    return (
        <Link href={`/builds/${build.id}`} target="_blank">
        <div className="build-item">
            
            <h3>
            
            {
            build.name.length < 50 ?
            build.name 
            :
            build.name.slice(0, 50) + "..."
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
            <div className="analytics">
                <div className="views">
                    <i className="fa fa-eye fa-lg"/> &nbsp; 
                    <label>{viewCount.toLocaleString()}</label>
                </div>
                <div className="likes">
                    <i className={liked ? "fa fa-heart" : "fa fa-heart-o"} onClick={onLikeClicked}/> &nbsp; 
                    <label>{likesCount.toLocaleString()}</label>
                </div>
                <div>
                    <i className={bookmarked ? "fa fa-bookmark": "fa fa-bookmark-o"} onClick={onBookmarkClicked}/>
                </div>
            </div>
        </div>
        </Link>
  )
}

export default BuildItem