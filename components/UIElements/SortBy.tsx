'use client'

import { useClickOutside, useWindowSizeChange } from "@/hooks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
    selected?: string,
    search?: string
}

function SortBy({ selected, search }: Props) {
    const [open, setOpen] = useState(false);
    const [widthFlag, setWidthFlag] = useState(window.innerWidth <= 624);
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

    useWindowSizeChange(() => {
        if (window.innerWidth <= 624) setWidthFlag(true);
        else setWidthFlag(false);
    });

    return (
        <div className="dropdown-container" ref={selectRef}>
        <div className="select-container unselectable" onClick={() => setOpen(!open)} >
            <div className="select">{selected && !widthFlag ? selected : "Sort By"}</div>
            <div className="select-icon">
                <i className=" fa fa-angle-down" aria-hidden="true"/>
            </div>
        </div>

        <div className={"dropdown" + (!open ? " hidden" : "")}>
            <br/>
            <ul>
                <Link href={`builds?sort=trending&page=1&search=${search}`}><li onClick={() => {setOpen(false)}}>Trending</li></Link>
                <Link href={`builds?sort=mostViewed&page=1&search=${search}`}><li onClick={() => {setOpen(false)}}>Most Viewed</li></Link>
                <Link href={`builds?sort=latest&page=1&search=${search}`}><li onClick={() => {setOpen(false)}}>Recently Updated</li></Link>
            </ul>
        </div>
    </div>
    )
}

export default SortBy