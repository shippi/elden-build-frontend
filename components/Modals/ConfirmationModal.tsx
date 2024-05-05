'use client'

import { useContext } from "react"
import { ExitButton } from ".."
import { FilePanelContext } from "@/context/FilePanelContext";

function ConfirmationModal() {
  const {setConfirmationOpen, confirmationMessage, confirmationFunction} = useContext(FilePanelContext);
  return (
    <div className="modal">
        <div className="modal-container">
          <ExitButton onClick={() => setConfirmationOpen(false)}/>
          <br/>
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