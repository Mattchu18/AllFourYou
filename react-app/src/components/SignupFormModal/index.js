import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [validationErrors, setValidationErrors] = useState("")
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errors = {}
		if (!email) errors.email = "Email is required"
		if (!username) errors.username = "Username is required"
		if (!password) errors.password = "Password is required"
		setValidationErrors(errors)

		if (!!Object.keys(errors).length) return

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
					{validationErrors.email ? (<p>{validationErrors.email}</p>) : null}
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}

					/>
				</label>
				<label>
					Username
					{validationErrors.username ? (<p>{validationErrors.username}</p>) : null}

					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}

					/>
				</label>
				<label>
					Password
					{validationErrors.password ? (<p>{validationErrors.password}</p>) : null}

					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}

					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}

					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
