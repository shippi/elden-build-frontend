'use client'
import { useClickOutside, useWindowSizeChange } from '@/hooks';
import { useEffect, useRef, useState } from 'react'

interface Props {
    items: any[],
    index: number,
    isNullable: boolean,
    hasImages: boolean,
    incompatibilities?: number[],
    scrollPage? : boolean,
    searchEnabled?: boolean,
    showSelected?: boolean,
    width?: string,
    onChange: Function
}

function DropDown({ items, index, isNullable, incompatibilities, hasImages, scrollPage, searchEnabled, showSelected, width, onChange }: Props) {  
    const [open, setOpen] = useState(showSelected == false ? true : false);
    const [search, setSearch] = useState("");
    const [dropDownWidth, setDropDownWidth] = useState("");

    const ref = useRef(null);
    useClickOutside(ref, () => {setOpen(false); setSearch("")});
    

    const dropdownSelectedRef = useRef(null);
    const scrollToRef = (ref: any) => {
        if (ref.current && index > -1) {
            if(ref.current.children[index]) {
                if (scrollPage) ref.current.children[index].scrollIntoView({ block: 'center' });
                else ref.current.children[index].scrollIntoView({ block: 'center' });
            }
        }   
        else if (ref.current && index == -1) {       
            ref.current.children[0].scrollIntoView({ block: 'center' }); 
        }
    };

    const selectedRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (open) scrollToRef(dropdownSelectedRef);
        if (selectedRef.current) setDropDownWidth(selectedRef.current.offsetWidth + "px");
    }, [open]);

    useEffect(() => {
        if (width) {
            setDropDownWidth(width);
        }
    })

    const handleWindowSizeChange = () => {
        if (width) {
            setDropDownWidth(width);
            console.log(width)
        }
        else if (selectedRef.current && !width) setDropDownWidth(selectedRef.current.offsetWidth + "px")

    }
    
    useWindowSizeChange(() => handleWindowSizeChange());
    
    const isCompatible = (currItem: any, currIndex: number) => {
        let compatible = true;
        
        if (incompatibilities?.includes(currIndex) && currIndex > -1) return false;

        incompatibilities?.forEach(i => {
            let item = items[i];
            if (item?.group && currItem.group == item?.group && i != index) compatible = false;
        });
        
        return compatible;
    }

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="select-menu" ref={ref}>
            <div className={"selected"  + (showSelected != false ? "" : " hidden")} onClick={() => { setOpen(!open); }} ref={selectedRef}>
                <div>
                    { index > -1 && hasImages ? <img src={items[index].image}/> : hasImages ? <div style={{height: "35px", width: "5px"}}/> : "" }
                    { index > -1 ? items[index]?.name : "None" }
                </div>
                <i className={(!open ? "" : "rotate") + " fa fa-angle-down"} aria-hidden="true" style={{marginRight: "5px"}}/>
            </div>
            {
                
                <div className={"dropdown" + (open ? "": " hidden")} style={{width: dropDownWidth}}>
                    { 
                        searchEnabled &&
                        <div className="search-box">
                        <i className="fa fa-search" aria-hidden="true"/>
                        <input 
                            type="text"
                            value={search}
                            placeholder="Search..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </div> 
                    }
                      
                <ul ref={dropdownSelectedRef}>
                    {
                        isNullable == true &&
                        <li 
                            className={index < 0 ? "selected-item" : ""} 
                            key="None"
                            onClick={() => { 
                                onChange(-1); 
                                setOpen(false); 
                            }}
                        >
                            None
                        </li>
                    }
                    {
                        items.map((item, i) => (
                            item.name.toLowerCase().replace(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').indexOf(search.toLowerCase().replace(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')) >= 0 &&
                            <li 
                                className={i == index ? "selected-item" : isCompatible(item, i) == false ? "disabled" : ""}
                                key={item.name + " " + i} 
                                onClick={() => {
                                    if(isCompatible(item, i)) {
                                        onChange(i);
                                        setOpen(false);
                                        setSearch("");
                                    }
                                }}
                            >
                                {(item.image && hasImages) && <img src={item.image}/>}
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
                </div>
            }
        </div>
        </>
        
    )
}

export default DropDown