'use client'
import { useEffect, useRef, useState } from "react";
import { useClickOutside, useOnKeyPress } from "@/hooks";
import { Talisman, Armour, GreatRune } from "@/helpers/types";
import { calculateStatLevel, getEquipmentTotalValue, getEquipmentValues, getRuneValue } from "@/helpers/BuildCreatorHelper";

interface Props {
    type: string,
    initialValue: string,
    addedValue: number,
    talismans: Talisman[],
    armours: Armour[],
    greatRune?: GreatRune,
    onChange: Function
}

/**
 * Component used for displaying and modifying a specific character stat.
 * Used in CharacterPanel component.
 * @param param0 
 * @returns 
 */
function StatRow({ type, initialValue, addedValue, talismans, armours, greatRune, onChange}: Props) {
    const MAX = 99; // highest value that a single stat can go

    // state for the value in the number input
    const [value, setValue] = useState((+initialValue + addedValue).toString());
    
    const [affectedByEquipment, setAffecectedByEquipment] = useState(false);
    const totalValue = calculateStatLevel(+initialValue, +addedValue, getEquipmentValues(talismans, type), getEquipmentValues(armours, type), getRuneValue(type, greatRune)).toString();

    // useEffect hook to update component when initialValue prop has changed.
    // this will reset the value and change it depending on selected class
    useEffect(() => {
        setValue(initialValue);
        onChange(0);
    }, [initialValue]);

    useEffect(() => {
        if (getEquipmentTotalValue([...talismans, ...armours], type) + getRuneValue(type, greatRune) > 0) setAffecectedByEquipment(true);
        else setAffecectedByEquipment(false);
    }, [talismans, armours, addedValue, greatRune]);

    useEffect(() => {
        setValue((+initialValue + addedValue).toString())
    }, [addedValue]);

    useOnKeyPress(['Enter', 'Tab'], () => handleClick());

    // this block of code is used to detect and handle when a user
    // has clicked outside the number input
    const ref = useRef(null);
    useClickOutside(ref, () => handleClick());

    const handleClick = () => {
        if (+value < +initialValue) {  // checks if the inputted value is less than the class' base stat value
            setValue(initialValue); // sets value in number box to base stat value
            onChange(0);
        }
        else if (+value > MAX) { // checks if inputted value exceeds the max
            // sets value to max and sends parent the added value
            setValue(MAX.toString());
            onChange(MAX - +initialValue);
        }
        else {
            onChange(+value - +initialValue); // sends parent the added value
        }
    }
    
    // handler for button clicks, will either increment or decrement number
    const handleButtonClick = (increment: boolean) => {
        if (increment) {        
            if (+value + 1 > MAX) { // checks if inputted value exceeds the max
                // sets value to max and sends parent the added value
                setValue(MAX.toString());
                onChange(MAX - +initialValue);
            }
            else {
                setValue((+value + 1).toString())  
                onChange(+value + 1 - +initialValue); // sends parent the added value
            }
            
        }
        else if (!increment) {
            if (+value - 1 > +initialValue) { // checks if inputted value greater than class base
                setValue((+value - 1).toString());
                onChange((+value - 1) - +initialValue); // sends parent the added value
            }
            else {       
                setValue(initialValue)  
                onChange(0);
            }
        }
    }

    return (
      <div className="stat-row" >
        <div className='label'>{ type }</div>
        <div className="number-container" ref={ref}>
            <input 
                className={"number-input " + (value != initialValue && "adjusted")} 
                onChange={e => {
                    setValue(e.target.value.replace(/\D/g,''));      
                }}
                type="text"
                value={value}
            /> 
            <span> &nbsp; /&nbsp; 99</span>
            <div className="button-container">
                <button onClick={() => handleButtonClick(true)}>
                    <i className="fa fa-caret-down rotate" aria-hidden="true"></i>
                </button>
                <button onClick={() => handleButtonClick(false)}>
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div style={{width: "40px", textAlign:"right"}} className={affectedByEquipment ? "adjusted" : ""}>
            { totalValue }
        </div>
      </div>
    )
  }
  
  export default StatRow