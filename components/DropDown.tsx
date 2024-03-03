'use client'
import { useClickOutside } from '@/hooks';
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
        <div className="select-menu" ref={ref}>
            <div className="selected" onClick={() => setOpen(!open)} >
                { items[index].name }
                <i className={(!open ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"></i>
            </div>
            {
                open && 
                <ul  >
                    <div className="search-box">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input 
                            type="text"
                            value={search}
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
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