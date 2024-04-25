'use client'

import { useClickOutside } from "@/hooks";
import { useRef, useState } from "react";

function SortBy() {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);
    useClickOutside(selectRef, () => {setOpen(false)})

    return (
        <div className="dropdown-container">
        <div className="select-container unselectable" onClick={() => setOpen(!open)} ref={selectRef}>
            <div className="select">Sort By</div>
            <div className="select-icon">
                <i className=" fa fa-angle-down" aria-hidden="true"/>
            </div>
        </div>

        <div className={"dropdown " + (!open && " hidden")}>
            <br/>
            <ul>
                <li>Trending</li>
                <li>Most Viewed</li>
                <li>Recently Updated</li>
            </ul>
        </div>
    </div>
    )
}

export default SortBy