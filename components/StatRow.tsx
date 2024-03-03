'use client'
import useClickOutside from "@/hooks/useClickOutside";

import { useEffect, useRef, useState } from "react";

interface Props {
    type: string,
    initialValue: string,
    addedValue: number,
    onChange: Function
}


function StatRow({ type, initialValue, addedValue, onChange}: Props) {
    const [value, setValue] = useState((+initialValue + addedValue).toString());

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const MAX = 99;

    const ref = useRef(null);
    useClickOutside(ref, () => handleClick());

    const handleClick = () => {
        if (+value < +initialValue) {
            onChange(0);
            setValue(initialValue);
        }
        else if (+value > MAX) {
            onChange(MAX - +initialValue);
            setValue(MAX.toString());
        }
        else {
            onChange(+value - +initialValue);
        }
    }
    
    return (
      <div className="stat-row" >
        {type + ": "}
        <div className="number-container" ref={ref}>
            <input 
                className="number-input" 
                onChange={e => {
                    setValue(e.target.value.replace(/\D/g,''));      
                }}
                type="text"
                value={value}
            /> 
            <span> &nbsp; /&nbsp; 99</span>
            <div className="button-container">
                <button>
                    <i className="fa fa-caret-down rotate" aria-hidden="true"></i>
                </button>
                <button>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        
      </div>
    )
  }
  
  export default StatRow