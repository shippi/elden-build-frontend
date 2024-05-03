"use client";

import { FormEvent, useContext, useState } from "react";
import ExitButton from "../UIElements/ExitButton";
import { AuthContext } from "@/context/AuthContext";
import { validateEmail } from "@/helpers/SignUpHelper";

function ResetPasswordModal() {
	const { setResetOpened } = useContext(AuthContext)
	const [usernameInput, setUsernameInput] = useState<string>("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	}

  	return (
    <div className="modal">
      <div className="modal-container">
        <ExitButton onClick={() => setResetOpened(false)} />
        <h1>Reset Password</h1>
        <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
                <div><label>Email</label></div>
                <input type="text" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} required/>
            </div>
			<button type="submit" className={!validateEmail(usernameInput) || !usernameInput ? "disabled" : ""} disabled={!validateEmail(usernameInput)}>Submit</button>
		</form>
      </div>
    </div>
  	);
}

export default ResetPasswordModal;
