interface Props {
    onClick: Function
}

function ExitButton({onClick} : Props) {
  return (
    <button className="exit-button" onClick={() => onClick()}>
        <i className="fa fa-times" aria-hidden="true"></i>
    </button>
  )
}

export default ExitButton