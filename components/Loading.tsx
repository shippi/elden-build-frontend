import { BeatLoader } from "react-spinners"

function Loading() {
  return (
    <div className="loading-screen">
        <BeatLoader size={30} color={"#FFFFFF"} loading={true}/>

        <div style={{height: "20vh"}}></div>
    </div>
  )
}

export default Loading