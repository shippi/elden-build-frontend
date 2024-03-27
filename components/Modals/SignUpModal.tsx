'use client'
import AuthContext from "@/context/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { signup } from "@/services/authService";
import { checkEmailExists, checkUsernameExists, delay, validateEmail, validatePassword, validateUsername } from "@/utils/SignUpUtils";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

function SignUpModal() {
  const {setSignUpOpened} = useContext(AuthContext);  

  const [usernameInput, setUsernameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidity, setPasswordValidility] = useState(true);
  const [emailValidity, setEmailValidity] = useState(true);
  const [usernameValidity, setUsernameValidity] = useState(true);

  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [error, setError] = useState("");

  const debouncedUsername = useDebounce(usernameInput);
  const debouncedEmail= useDebounce(emailInput);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    setTimeout(() => setPasswordValidility(validatePassword(e.target.value).score > 3), 10);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");

      setLoading(true);
      await signup(emailInput, usernameInput, passwordInput);
      delay(1000);
      setSignUpOpened(false);

    }
    catch (error) {
      setError("Failed to create account.");
    }
    finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const checkValidity = async() => {
      if (debouncedUsername && validateUsername(debouncedUsername)) {
        setUsernameLoading(true);
        const validity = await checkUsernameExists(debouncedUsername);
        if (!validity) setUsernameError("This username is already taken");
  
        setUsernameValidity(validity);
        setUsernameLoading(false);
      }
    };
  
    checkValidity();
  
    if (!validateUsername(usernameInput)) {
      setUsernameError("Username must be at between 4-30 characters long");
      setUsernameValidity(false);
    }
  }, [debouncedUsername]);

  useEffect(() => {
    const checkValidity = async() => {
      if (debouncedEmail && validateEmail(debouncedEmail)) {
        setEmailLoading(true);
        const validity = await checkEmailExists(debouncedEmail);
        if (!validity) setEmailError("This email is already taken");
  
        setEmailValidity(validity);
        setEmailLoading(false);
      }
    };
  
    checkValidity();
  
    if (!validateEmail(emailInput)) {
      setEmailError("Please enter a valid email");
      setEmailValidity(false);
    }
  }, [debouncedEmail]);

  return (
    <>
    <div className="modal">
    <div className="signup-container">
        <button className="exit-button" onClick={() => {setSignUpOpened(false)}}>
            <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <div><h1>Sign Up</h1></div>
        <form className="signup-form" autoComplete="off" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <div>
            <label>Email</label>
            {emailLoading && <span className="spinner"></span>}
          </div>
          <input className={!emailValidity ? "invalid" : ""} type="text" onChange={e => setEmailInput(e.target.value)} required/>
          <span className="error">{!emailValidity && emailError}</span>
        </div>
        <div className="form-group">
          <div>
            <label>Username</label>
            {usernameLoading && <span className="spinner"></span>}
          </div>
          <input className={!usernameValidity ? "invalid" : ""} type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value.replace(/[^\w_]/g,''))} required/>
          <span className="error">{!usernameValidity && usernameError}</span>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-container">
            <input className={!passwordValidity ? "invalid" : ""} type={passwordVisible ? "text" : "password"} onChange={e => handlePasswordChange(e)} required />
            <i className={"fa" + (passwordVisible ? " fa-eye-slash" : " fa-eye") + (!passwordValidity ? " invalid" : "")} aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}/>
          </div>
          <span className="error">{!passwordValidity && "Your password is too weak" }</span>
        </div>
        <button type="submit" disabled={loading}>{loading ? <span className="spinner"></span> : "Sign Up"}</button>  
        {error != "" && <span className="error" style={{textAlign: "center"}}>{error}</span>}      
      </form>
      </div>
    </div>
    </>
  )
}

export default SignUpModal