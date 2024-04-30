import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext } from "react"

function DescriptionInput() {
    const { description, setDescription } = useContext(BuildCreatorContext);

    return (
        <div className="description-container">
            <div style={{height: "10px"}}/>
            <label>Description</label>
            <div style={{height: "5px"}}/>
            <textarea rows={5} cols={76} value={description} onChange={e => setDescription(e.target.value)}>
            </textarea>
        </div>
    )
}

export default DescriptionInput