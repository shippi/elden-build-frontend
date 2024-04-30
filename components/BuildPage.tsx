'use client'
import { DisplayAmmo, DisplayArmours, DisplayAttackPower, DisplayCharacter, DisplayDefenses, DisplaySpells, DisplayStats, DisplayWeapons } from "."
import { getItemFromName } from "@/helpers/BuildCreatorHelper"
import { armours, arrows, bolts, classes, greatRunes, spells, talismans, weapons } from "@/public/data"
import DisplayTalismans from "./BuildsPanels/DisplayTalismans"
import DisplayGreatRune from "./BuildsPanels/DisplayGreatRune"
import DisplayPhysick from "./BuildsPanels/DisplayPhysick"
import { crystalTears } from "@/public/data/Equipment/crystalTears"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/AuthContext"

interface Props {
    buildData: any
}

function BuildPage({ buildData } : Props) {
    const creatorName = buildData.username
    const build = buildData.build;
    const description = buildData.description;
    const name = buildData.name;
    const viewCount = buildData.views;

    const { currentUser } = useContext(AuthContext);
    const [likesCount, setLikesCount] = useState(buildData.likes || 0);
    const [liked, setLiked] = useState(buildData.liked || false);
    const [bookmarked, setBookmarked] = useState(buildData.bookmarked || false);

    const selectedClass = getItemFromName(build.selectedClass, classes);
    const selectedArmours = build.selectedArmours.map((armour: string) => getItemFromName(armour, armours));
    const selectedTalismans = build.selectedTalismans.map((talisman: string) => getItemFromName(talisman, talismans));
    const selectedWeapons = build.selectedWeapons.map((weapon: string) => getItemFromName(weapon, weapons));
    const selectedAffinities = build.selectedAffinities;
    const selectedAshes = build.selectedAshes;
    const selectedWepLvls = build.selectedWepLvls;
    const selectedRune = getItemFromName(build.selectedRune, greatRunes);
    const selectedTears = build.selectedTears.map((tear: string) => getItemFromName(tear, crystalTears));
    const characterStats = build.characterStats;
    const selectedArrows = build.selectedArrows.map((arrow: string) => getItemFromName(arrow, arrows));
    const selectedBolts = build.selectedBolts.map((bolt: string) => getItemFromName(bolt, bolts));
    const selectedSpells = build.selectedSpells.map((spell: string) => getItemFromName(spell, spells));
    
    useEffect(() => {
        const addView = async() => {
            await fetch(process.env.NEXT_PUBLIC_API_URL + `builds/${buildData.id}/view-count`, {
                method: "POST",
                body: JSON.stringify({
                    user_id: currentUser?.uid
                })
            })
            .catch();
        }
        const timeout = setTimeout(() => {
            addView();
        }, 5000);
      
        return () => clearTimeout(timeout);
    }, [])
    
    const onLikeClicked = () => {
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

        if (!currentUser) return;

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

    const onBookmarkClicked = () => {
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

        if (!currentUser) return;

        if (bookmarked) {
            removeBookmark();
        }
        else {
            addBookmark();
        }

        setBookmarked(!bookmarked);
    }

    return (
        <>
        <div style={{height: "40px"}}></div>
       
        <div className="build-page">
            <div className="panels-container">
            <div className="header">
                <h1>{name}</h1> 
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
                <div>Created by <span style={{color:"gold"}}>{creatorName}</span></div>
                <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
                <div className="analytics">
                <div className="views">
                    <i className="fa fa-eye fa-lg"/> &nbsp; 
                    <label style={{color: "white"}}>{viewCount.toLocaleString()}</label>
                </div>
                <div className="likes">
                    <i className={liked ? "fa fa-heart" : "fa fa-heart-o"} onClick={onLikeClicked}/> &nbsp; 
                    <label style={{color: "white"}}>{likesCount.toLocaleString()}</label>
                </div>
                <div>
                    <i className={bookmarked ? "fa fa-bookmark": "fa fa-bookmark-o"} onClick={onBookmarkClicked}/>
                </div>
            </div>
            </div>
            
            </div>
            
            {
                
            }
            <div className="panels-container">
                {
                    description &&
                    <div>
                        <div style={{height:"15px"}}/>
                        <div className="description">{description}</div>
                    </div>
                }
                <div className="separator" style={{width: "100%"}}/>
            </div>
            
            <div className="panels-container">
                <div className="subcontainer">
                    <DisplayCharacter 
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}           
                    />
                    <DisplayGreatRune 
                        selectedRune={selectedRune}
                    />
                    <DisplayPhysick 
                        selectedTears={selectedTears}
                    />
                </div>
                <div className="subcontainer">
                    <DisplayWeapons 
                        selectedWeapons={selectedWeapons} 
                        selectedAffinities={selectedAffinities} 
                        selectedAshes={selectedAshes} 
                        selectedLevels={selectedWepLvls}   
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}                      
                    />
                    <div className="subcontainer2">
                        <DisplayArmours selectedArmours={selectedArmours} />
                        <DisplayTalismans selectedTalismans={selectedTalismans} />
                    </div>
                </div>

                <div className="subcontainer">
                    <DisplayStats
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}     
                        selectedWeapons={selectedWeapons}      
                    />
                    <DisplayAttackPower 
                        selectedWeapons={selectedWeapons} 
                        selectedAffinities={selectedAffinities} 
                        selectedLevels={selectedWepLvls}   
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune} 
                        selectedTears={selectedTears}     
                    />
                    <DisplayDefenses 
                        selectedClass={selectedClass}
                        characterStats={characterStats}
                        selectedTalismans={selectedTalismans}
                        selectedArmours={selectedArmours}
                        greatRune={selectedRune}
                        selectedTears={selectedTears}                   
                    />
                </div>
                <div className="separator" style={{width: "100%"}}/>
                <div className="bottom-panels-container">
                    <DisplayAmmo selectedArrows={selectedArrows} selectedBolts={selectedBolts}/>
                    
                    <div style={{width:"3vw"}}/>
                    <DisplaySpells 
                        selectedClass={selectedClass} 
                        characterStats={characterStats}   
                        selectedTalismans={selectedTalismans}   
                        selectedArmours={selectedArmours}  
                        greatRune={selectedRune}
                        selectedTears={selectedTears} 
                        selectedSpells={selectedSpells}
                    />
                </div>
                
            </div>
            <div style={{height:"5vw"}}/>
        </div>
        </>
    )
}

export default BuildPage