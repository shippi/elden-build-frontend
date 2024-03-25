'use client'
import { useState } from "react";

function SignUp() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    
    <div className="signup">
      <form className="signup-form" autoComplete="off">
        <h1>Sign Up</h1>
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
      </form>
    </div>
    </>
  )
}

export default SignUp