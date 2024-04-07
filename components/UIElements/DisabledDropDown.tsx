interface Props {
    value: string
}
function DisabledDropDown({value} : Props) {
  return (
    <div className="select-menu" >
        <div className="selected disabled">
            <div>
                {value}
            </div>
            <i className=" fa fa-angle-down" aria-hidden="true"></i>
        </div>
    </div>
  )
}

export default DisabledDropDown