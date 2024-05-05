'use client'
import { useClickOutside, useFocus, useWindowSizeChange } from '@/hooks';
import { useEffect, useRef, useState } from 'react'

interface Props {
    items: any[],
    index: number,
    isNullable: boolean,
    hasImages: boolean,
    otherIndices?: number[],
    scrollPage? : boolean,
    searchEnabled?: boolean,
    showSelected?: boolean,
    width?: string,
    onChange: Function
}

function DropDown({ items, index, isNullable, otherIndices, hasImages, scrollPage, searchEnabled, showSelected, width, onChange }: Props) {  
    const [open, setOpen] = useState(showSelected == false ? true : false);
    const [search, setSearch] = useState("");
    const [dropDownWidth, setDropDownWidth] = useState("");

    /**
     * useRef used to reference the select-menu div, and custom hook used
     * to close the dropdown when user clicks outside of it
     */
    const selectMenuRef = useRef(null);
    useClickOutside(selectMenuRef, () => { setOpen(false); setSearch(""); });

    const dropdownSelectedRef = useRef(null); // references the selected item in dropdown menu

    // function used to scroll to the selected item in the dropdown
    const scrollToRef = (ref: any) => {
        if (ref.current && index > -1) {
            if(ref.current.children[index]) {
                if (scrollPage) ref.current.children[index].scrollIntoView({ block: 'center' });
                else ref.current.children[index].scrollIntoView({ block: 'center' });
            }
        }   
        else if (ref.current && ref.current.children[0] && index == -1) {       
            ref.current.children[0].scrollIntoView({ block: 'center' }); 
        }
    };

    const selectedRef = useRef<HTMLDivElement>(null); // references the selected div (not the selected item in dropdown)

    //
    const searchRef = useRef(null);
    const { setFocus } = useFocus(searchRef); 

    /**
     * Hook that triggers when the dropdown opens or closes. When dropdown is opened,
     * automatically scroll to the selected item. Also changes width of dropdown menu
     * based on width of the selected div.
     */
    useEffect(() => {
        if (open) {
            scrollToRef(dropdownSelectedRef);
            setFocus();
        }
        if (selectedRef.current) setDropDownWidth(selectedRef.current.offsetWidth + "px");
    }, [open]);

    // sets dropdown width to width prop value if it is specified
    useEffect(() => {
        if (width) setDropDownWidth(width);
    }, [])

    // changes the width of the dropdown menu dynamically when window size changes
    const handleWindowSizeChange = () => {
        if (width) setDropDownWidth(width);
        else if (selectedRef.current && !width) setDropDownWidth(selectedRef.current.offsetWidth + "px")
    }
    useWindowSizeChange(() => handleWindowSizeChange());

    /**
     * Function used to check if an item is incompatible (not selectable) when comparing
     * with the other selected items from the other dropdowns this might be associated with.
     * (only works if otherIndices is supplied as prop)
     */
    const isCompatible = (currItem: any, currIndex: number) => {
        let compatible = true;
        
        // returns false if item is already selected in another dropdown
        if (otherIndices?.includes(currIndex) && currIndex > -1) return false;

        /**
         * for each loop that checks if the item is in the same group as any of the
         * other selected items from the other dropdowns (only really used for talismans)
         */
        otherIndices?.forEach(i => {
            let item = items[i];
            if (item?.group && currItem.group == item?.group && i != index) compatible = false;
        });
        
        return compatible;
    }

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="select-menu" ref={selectMenuRef}>
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
                            ref={searchRef}
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
                             {hasImages && <img style={{width:"35px", height:"0px" , opacity: "0"}}/>}
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
                                    if(isCompatible(item, i) && i != index) {
                                        onChange(i);
                                        setOpen(false);
                                        setSearch("");
                                    }
                                }}
                            >
                                {(item.image && hasImages) && <img src={item.image} alt={item.name} width={item.image.includes("eldenring.fanapis.com") ? 24 : 35} height={35}/>}
                                {
                                    item.name.length < 40 ?
                                    item.name 
                                    :
                                    item.name.slice(0, 40) + "..."
                                }
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