'use client'

import { useContext } from "react"
import { ExitButton } from ".."
import { AuthContext } from "@/context/AuthContext";


function SignUpSuccessModal() {
  const {setSignUpSuccessOpened, setLoginOpened} = useContext(AuthContext);

  const handleClick = () => {
    setSignUpSuccessOpened(false);
    setLoginOpened(true);
  }

  return (
    <div className="modal">
      <div className="modal-container">
        <ExitButton onClick={() => setSignUpSuccessOpened(false)}/>
        <div><h1 style={{textAlign: "center"}}>Registration successful!</h1></div>
        <hr/>
        <div className="modal-content" style={{width: "100%"}}>
          <br/>
          <div style={{textAlign: "center", width:"100%"}}>
            <span className="click-here" onClick={handleClick}>Click here to login.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSuccessModal