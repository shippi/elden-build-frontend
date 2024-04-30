'use client'

import { useClickOutside } from "@/hooks";
import Link from "next/link";
import { useRef, useState } from "react";

interface Props {
    selected?: string,
    search?: string
}

function SortBy({ selected, search }: Props) {
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

        <div className={"dropdown" + (!open ? " hidden" : "")}>
            <br/>
            <ul>
                <li onClick={() => {setOpen(false)}}><Link href={`builds?sort=trending&page=1&search=${search}`}>Trending</Link></li>
                <li onClick={() => {setOpen(false)}}><Link href={`builds?sort=mostViewed&page=1&search=${search}`}>Most Viewed</Link></li>
                <li onClick={() => {setOpen(false)}}><Link href={`builds?sort=latest&page=1&search=${search}`}>Recently Updated</Link></li>
            </ul>
        </div>
    </div>
    )
}

export default SortBy