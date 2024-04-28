interface Props {
    numPages: number,
    currPage: number,
    onClick?: Function
}

function Pagination({numPages, currPage} : Props) {
    let pageButtons = [];

    if (currPage <= 4) {
        for (let i: number = 1; i < 8; i++) {
            pageButtons.push(
                <button key={i}>
                    {i}
                </button>
            )
        }
    }
    else if (currPage > numPages - 3) {
        for (let i: number = numPages - 6; i < numPages + 1; i++) {
            pageButtons.push(
                <button key={i}>
                    {i}
                </button>
            )
        }
    }
    else {
        for (let i: number = currPage - 3; i < currPage + 4; i++) {
            pageButtons.push(
                <button key={i}>
                    {i}
                </button>
            )
        }
    }

    return (
        <div className="pagination">
            <button>&lt;</button>
            {
                pageButtons
            }
            <button>&gt;</button>
        </div>
    )
}

export default Pagination