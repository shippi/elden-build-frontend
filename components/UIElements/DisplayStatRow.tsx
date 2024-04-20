interface Props {
    type: string,
    initialValue: string,
    addedValue: number
}

function DisplayStatRow({type, initialValue, addedValue} : Props) {
    const totalValue = +initialValue + addedValue;
    return (
        <div className="stat-row">
            <div className='label'>{ type }</div>
            <div className="number-container">
                <div className={"number-input " + (addedValue > 0 && "adjusted")} style={{borderColor: "grey"}}>{+initialValue + addedValue}</div>
                &nbsp; /&nbsp; 99
            </div>
            <div style={{width: "40px", textAlign:"right"}}>
            { totalValue }
        </div>
        </div>
    )
}

export default DisplayStatRow