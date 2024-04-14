'use client'

import { useContext } from "react"
import { ExitButton } from ".."
import BuildCreatorContext from "@/context/BuildCreatorContext"

function ConfirmationModal() {
  const {setConfirmationOpen, confirmationMessage, confirmationFunction} = useContext(BuildCreatorContext);
  return (
    <div className="modal">
        <div className="modal-container">
          <ExitButton onClick={() => setConfirmationOpen(false)}/>
          <br/>
          <div className="modal-content" style={{textAlign: "center"}}>
            <div>
            {confirmationMessage}
            </div>
            <div className="button-container">
              <button onClick={confirmationFunction}>YES</button>
              <br/>
              <button onClick={() => setConfirmationOpen(false)}>NO</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ConfirmationModal