interface Props {
  coverScreen?: boolean
}

function Loading({coverScreen} : Props) {
  return (
    <>
      {
        coverScreen ?
        <div className="loading-screen">
          <div className="centered">
            <div className="loader">
              <span className="spinner"></span>
            </div>
          </div>
        </div>
        :
        <div className={"loading-container"}>
          <div className="loader">
            <span className="spinner"></span>
          </div>
        </div>
      }
    </>

  )
}

export default Loading