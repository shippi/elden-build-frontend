"use client";

import { FormEvent, useContext, useState } from "react";
import ExitButton from "../UIElements/ExitButton";
import { AuthContext } from "@/context/AuthContext";
import { validateEmail } from "@/helpers/SignUpHelper";
import { sendPasswordResetEmail } from "firebase/auth";
import { delay } from "@/utils";

function ResetPasswordModal() {
	const { setResetOpened, setLoginOpened, auth } = useContext(AuthContext)
	
	const [usernameInput, setUsernameInput] = useState<string>("");
	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitLoading(true);
		await delay(500); 
		sendPasswordResetEmail(auth, usernameInput)
		.then(() => {
			setSubmitSuccess(true);
		})
		.catch(() => {

		})
		.finally(() => {setSubmitLoading(false)});
	}

  	return (
    <div className="modal">
      <div className="modal-container">
        <ExitButton onClick={() => setResetOpened(false)} />
        <h1>Reset Password</h1>
		{
			!submitSuccess ?
        	<form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
				<div className="form-group">
					<div><label>Email</label></div>
					<input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} required/>
				</div>
				<button 
					type="submit" 
					className={!validateEmail(usernameInput) || !usernameInput || submitLoading ? "disabled" : ""} 
					disabled={!validateEmail(usernameInput) || submitLoading}
				>
						{submitLoading ? <span className="spinner"></span> : "Submit"}
				</button>
			</form>
			:
			<div className="modal-content">
				<div className="reset-message">
					<p>A link to reset your password has been sent to the following email: <span>{usernameInput}</span>. </p> <br/>Once you have reset your password, visit the <span className="click-here" onClick={() => { setResetOpened(false); setLoginOpened(true); }}>login page</span>.
				</div>
				
			</div>
		}

      </div>
    </div>
  	);
}

export default ResetPasswordModal;
