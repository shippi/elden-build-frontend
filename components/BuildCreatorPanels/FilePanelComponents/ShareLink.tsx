import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext } from "react"

function ShareLink() {
    const { saveId } = useContext(BuildCreatorContext)
    return (
        <div className="share-link">
            <button className={saveId < 0 ? "disabled" : ""} style={{ width: "fit-content" }} >
            <i className="fa fa-share" aria-hidden="true"/>

            </button>
            
            <div className="link"> {
                saveId > 0 &&
                process.env.NEXT_PUBLIC_WEBSITE_URL + "builds/" + saveId
            }</div>
        </div>
    )
}

export default ShareLink