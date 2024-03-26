'use client'
import AuthContext from "@/context/AuthContext";
import { validateEmail, validatePassword, validateUsername } from "@/utils/SignUpUtils";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

function SignUpModal() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidity, setPasswordValidility] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [usernameValidity, setUsernameValidity] = useState(true);

  const {setSignUpOpened} = useContext(AuthContext);  
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => setPasswordValidility(validatePassword(e.target.value).score > 3), 10);
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => setEmailValidity(validateEmail(e.target.value)), 10);
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => setUsernameValidity(validateUsername(e.target.value)), 10);
  } 

  const handleSubmit = () => {
    
  }

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
          <input className={!emailValidity ? "invalid" : ""} type="text" ref={emailRef} onChange={e => handleEmailChange(e)} required/>
          <span>{!emailValidity && "Please enter a valid email"}</span>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input className={!usernameValidity ? "invalid" : ""} type="text" ref={usernameRef} onChange={e => handleUsernameChange(e)} required/>
          <span>{!usernameValidity && "Username must be at least 3 characters long"}</span>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-container">
            <input className={!passwordValidity ? "invalid" : ""} type={passwordVisible ? "text" : "password"} ref={passwordRef} onChange={e => handlePasswordChange(e)} required />
            <i className={"fa" + (passwordVisible ? " fa-eye-slash" : " fa-eye") + (!passwordValidity ? " invalid" : "")} aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}/>
          </div>
          <span>{!passwordValidity && "Your password is too weak" }</span>
        </div>
        <button type="submit">Sign Up</button>        
      </form>
      </div>
    </div>
    </>
  )
}

export default SignUpModal