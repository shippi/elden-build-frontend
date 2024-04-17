import BuildCreatorContext from "@/context/BuildCreatorContext";
import { useContext } from "react";

function VisibilityToggle() {
    const { setIsPublic, isPublic } = useContext(BuildCreatorContext);

    const handleVisibilityOnClick = () => {
        setIsPublic(!isPublic);
    }

    return (
    <div>
        <label>Visibility </label>
        <div className="visibility-container">
            <i className={isPublic ? "fa fa-eye fa-lg" : "fa fa-eye-slash fa-lg" } aria-hidden="true" style={{fontSize: "32px"}} onClick={handleVisibilityOnClick}/>
            <div style={{borderLeft: "1px solid grey", height:"25px"}}/>
            { isPublic ? "Public" : "Private" }
        </div>
    </div>
    )
}

export default VisibilityToggle