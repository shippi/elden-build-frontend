'use client'
import { useContext, useState } from "react"
import { ExitButton } from ".."
import { AuthContext } from "@/context/AuthContext"

function LoginModal() {
    const {setLoginOpened} = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
      const [loading, setLoading] = useState(false);
    return (
        <div className="modal">
            <div className="modal-container">
                <ExitButton onClick={() => setLoginOpened(false)}/>
                <div><h1>Log In</h1></div>
                <form className="signup-form" autoComplete="off">
                    <div className="form-group">
                        <div>
                            <label>Username</label>
                        </div>
                        <input type="text" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-container">
                            <input type={passwordVisible ? "text" : "password"} required />
                            <i className={"fa" + (passwordVisible ? " fa-eye-slash" : " fa-eye")} aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}/>
                        </div>
                    </div>
                    <button type="submit" disabled={loading}>{loading ? <span className="spinner"></span> : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal