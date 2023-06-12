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
	const [city, setCity] = useState("")
	const [phone_number, setphone_number] = useState("")
	const [first_name, setfirst_name] = useState("")
	const [last_name, setlast_name] = useState("")
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errors = {}
		if (!email) errors.email = "Email is required"
		if (!username) errors.username = "Username is required"
		if (!password) errors.password = "Password is required"
		if (!phone_number) errors.phone_number = "Phone is required"
		if (!city) errors.city = "City is required"
		if (!first_name) errors.first_name = 'First name is required'
		if (!last_name) errors.last_name = 'Last name is required'
		setValidationErrors(errors)

		if (!!Object.keys(errors).length) return

		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, first_name, last_name, password, city, phone_number));
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
			<form className='signupForm' onSubmit={handleSubmit}>
				<h1>Sign Up</h1>
				{errors.map((error, idx) => (
					<>
						<p className="error" key={idx}>{error}</p>
						{console.log(error)}
					</>
				))}
				{validationErrors.email ? (<p className="error">{validationErrors.email}</p>) : null}
				<div className='signupDiv'>
					<label>
						Email
					</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}

					/>

				</div>
				{validationErrors.username ? (<p className="error">{validationErrors.username}</p>) : null}
				<div className='signupDiv'>
					<label>
						Username
					</label>

					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}

					/>
				</div>
				{validationErrors.first_name ? (<p className="error">{validationErrors.first_name}</p>) : null}
				<div className='signupDiv'>
					<label>
						First Name
					</label>
					<input
						type='text'
						value={first_name}
						onChange={(e) => setfirst_name(e.target.value)}
					/>
				</div>
				{validationErrors.last_name ? (<p className="error">{validationErrors.last_name}</p>) : null}
				<div className='signupDiv'>
					<label>
						Last Name
					</label>
					<input
						type='text'
						value={last_name}
						onChange={(e) => setlast_name(e.target.value)}
					/>
				</div>
				{validationErrors.city ? (<p className="error">{validationErrors.city}</p>) : null}
				<div className='signupDiv'>
					<label>
						City
					</label>
					<input
						type='text'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				{validationErrors.phone_number ? (<p className="error">{validationErrors.phone_number}</p>) : null}
				<div className='signupDiv'>
					<label>
						Phone Number
					</label>
					<input
						type='text'
						value={phone_number}
						onChange={(e) => setphone_number(e.target.value)}
					/>

				</div>

				{validationErrors.password ? (<p className="error">{validationErrors.password}</p>) : null}
				<div className='signupDiv'>
					<label >
						Password
					</label>

					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}

					/>
				</div>

				<div className='signupDiv'>
					<label>
						Confirm Password
					</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}

					/>

				</div>
				<div className="signupButton">

				<button type="submit">Sign Up</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;
