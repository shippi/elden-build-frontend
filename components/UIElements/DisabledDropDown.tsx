interface Props {
    value: string
}
function DisabledDropDown({value} : Props) {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className="select-menu" >
        <div className="selected disabled">
            <div>
                {value}
            </div>
            <i className=" fa fa-angle-down" aria-hidden="true"></i>
        </div>
    </div>
    </>
  )
}

export default DisabledDropDown