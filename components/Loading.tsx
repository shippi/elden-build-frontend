import { BeatLoader } from "react-spinners"

function Loading() {
  return (
    <div className="loading-screen">
      <div className="centered">
        <div className="loader">
          <BeatLoader size={30} color={"#FFFFFF"} loading={true}/>
        </div>
      </div>
    </div>
  )
}

export default Loading