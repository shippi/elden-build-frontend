import BuildCreatorContext from "@/context/BuildCreatorContext"
import Link from "next/link";
import { useContext } from "react"

function ShareLink() {
    const { saveId } = useContext(BuildCreatorContext);
    
    const buttonOnClick = () => {
        window.open("builds/" + saveId, "_blank")
    }

    return (
        <div className="share-link">
            
            <button className={saveId < 0 ? "disabled" : ""} onClick={buttonOnClick} style={{ width: "fit-content" }} >
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