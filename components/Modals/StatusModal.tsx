interface Props {
    success: boolean,
    message: string
}

function StatusModal({success, message} : Props) {
    return (
        <div className="status-modal" style={{borderBottom: "2px solid" + (success ? " lime" : " red")}}>
                <i className={success ? "bi bi-check2-circle" : "bi bi-x-lg"}/>
                {message}
        </div>
    )
}

export default StatusModal
