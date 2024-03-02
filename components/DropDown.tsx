'use client'

import useClickOutside from '@/hooks/useClickOutside';
import { useRef, useState } from 'react'

interface Props {
    items: any[],
    index: number,
    onChange: Function
}

function DropDown({ items, index, onChange }: Props) {  
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef(null);
    useClickOutside(ref, () => setOpen(false));

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="select-menu">
            <div className="selected" onClick={() => setOpen(!open)} >
                { items[index].name }
                <i className={(!open ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"></i>
            </div>
            {
                open && 
                <ul  ref={ref}>
                    <div className="search-box">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input 
                            type="text"
                            value={search}
                            placeholder="Search..."
                            onChange={(e) => {setSearch(e.target.value.toLowerCase()); console.log(search)}}
                        />
                    </div>
                    {
                        items.map((item, i) => (
                            item.name.toLowerCase().indexOf(search) >= 0 ? 
                            <li 
                                className={ i == index ? "selected-item " : "" }
                                key={i} 
                                onClick={() => {
                                    onChange(i);
                                    setOpen(false);
                            }}>
                                {item.name}
                            </li>
                            :
                            ""
                        ))
                    }
                </ul>
            }
        </div>
        </>
    )
}

export default DropDown