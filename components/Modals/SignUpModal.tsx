'use client'
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

function SignUpModal() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {signUpOpened, setSignUpOpened} = useContext(AuthContext);  

  return (
    <>
    <div className="signup">
    <div className="signup-container">
        <button className="exit-button" onClick={() => {setSignUpOpened(false)}}>
            <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <div><h1>Sign Up</h1></div>
        <form className="signup-form" autoComplete="off">
        <div className="form-group">
          <label>Email</label>
          <input type="text" required/>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" required/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-container">
            <input type={passwordVisible ? "text" : "password"} minLength={8} required />
            <i className={"fa" + (passwordVisible ? " fa-eye-slash" : " fa-eye")} aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}/>
          </div>
        </div>
        <button type="submit">Sign Up</button>        
      </form>
      </div>
    </div>
    </>
  )
}

export default SignUpModal