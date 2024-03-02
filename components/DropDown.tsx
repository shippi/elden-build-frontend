'use client'

import { useState } from 'react'

interface Props {
    items: any[],
    index: number,
    onChange: Function
}


function DropDown({ items, index, onChange }: Props) {  
    const [open, setOpen] = useState(false);
    console.log(index)
    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="select-menu">
            <div className="selected" onClick={() => setOpen(!open)}>
                { items[index].name }
                <i className={(!open ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true"></i>
            </div>
            {
                open && 
                <ul>
                {
                    items.map((item, i) => (
                        <li 
                            className={i==index ? "selected-item" : ""}
                            key={i} 
                            onClick={() => {
                                onChange(i);
                                setOpen(false);
                        }}>
                            {item.name}
                        </li>
                    ))
                }
                </ul>
            }
        </div>
        </>
    )
}

export default DropDown