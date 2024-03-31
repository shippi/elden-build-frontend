'use client'
import BuildCreatorContext from "@/context/BuildCreatorContext"
import { useContext } from "react"

function FilePanel() {
  const {buildName, setBuildName} = useContext(BuildCreatorContext)

  return (
    <div className="file-panel">
      <div>
        <label>Build Name: </label>
        <input type="text" value={buildName} onChange={e => setBuildName(e.target.value)}/>
      </div>
      <button>Load</button>
      <button>Save</button>
    </div>
  )
}

export default FilePanel
