'use client'

import { useContext } from "react"
import { ExitButton } from ".."
import AuthContext from "@/context/AuthContext"

function SignUpSuccessModal() {
  const {setSignUpSuccessOpened} = useContext(AuthContext);
  return (
    <div className="modal">
      <div className="modal-container">
        <ExitButton onClick={() => setSignUpSuccessOpened(false)}/>
        
        <div><h1 style={{textAlign: "center"}}>Registration successful!</h1></div>
        <hr/>
        <div className="modal-content">
          <br/>
          <div style={{textAlign: "center"}}>
            <span className="click-here">Click here</span> to login.
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SignUpSuccessModal