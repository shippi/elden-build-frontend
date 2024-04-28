'use client'

import { useClickOutside } from "@/hooks";
import { useRef, useState } from "react";

interface Props {
    selected?: string,
    page?: number
}

function SortBy({ selected, page }: Props) {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);
    useClickOutside(selectRef, () => { setOpen(false) })

    switch (selected) {
        case "mostviewed":
            selected = "Most Viewed"
            break;
        case "latest":
            selected = "Recently Updated"
            break;
        default:
            selected = "Trending"
    }

    return (
        <div className="dropdown-container" ref={selectRef}>
        <div className="select-container unselectable" onClick={() => setOpen(!open)} >
            <div className="select">{selected ? selected : "Sort By"}</div>
            <div className="select-icon">
                <i className=" fa fa-angle-down" aria-hidden="true"/>
            </div>
        </div>

        <div className={"dropdown " + (!open && " hidden")}>
            <br/>
            <ul>
                <li onClick={() => {setOpen(false)}}><a href={`builds?sort=trending&page=${page ? page : 1}`}>Trending</a></li>
                <li onClick={() => {setOpen(false)}}><a href={`builds?sort=mostViewed&page=${page ? page : 1}`}>Most Viewed</a></li>
                <li onClick={() => {setOpen(false)}}><a href={`builds?sort=latest&page=${page ? page : 1}`}>Recently Updated</a></li>
            </ul>
        </div>
    </div>
    )
}

export default SortBy