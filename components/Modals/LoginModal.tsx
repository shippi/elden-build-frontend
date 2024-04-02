'use client'
import { FormEvent, useContext, useState } from "react"
import { ExitButton } from ".."
import { AuthContext } from "@/context/AuthContext"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { delay } from "@/utils";

function LoginModal() {
    const {setLoginOpened} = useContext(AuthContext);
    
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        delay(1000);
        await signInWithEmailAndPassword(auth, usernameInput, passwordInput)
        .then(async res => {
            setLoginOpened(false);
        })
        .catch(error => {
            if (error.code == 'auth/wrong-password' || error.code == 'auth/invalid-credential') 
                setError("Invalid log in details. Please try again.");
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="modal">
            <div className="modal-container">
                <ExitButton onClick={() => setLoginOpened(false)}/>
                <div><h1>Log In</h1></div>
                <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div>
                            <label>Email</label>
                        </div>
                        <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-container">
                            <input type={passwordVisible ? "text" : "password"} value={passwordInput} onChange={e => setPasswordInput(e.target.value)} required />
                            <i className={"fa" + (passwordVisible ? " fa-eye-slash" : " fa-eye")} aria-hidden="true" onClick={() => setPasswordVisible(!passwordVisible)}/>
                        </div>
                    </div>
                    <span className="error">{error}</span>
                    <button type="submit" className={!(passwordInput && usernameInput) ? "disabled" : ""} disabled={loading}>{loading ? <span className="spinner"></span> : "Log In"}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal