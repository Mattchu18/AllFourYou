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
						<li key={idx}>{error}</li>
					))}
				<div className='signupDiv'>
				<label>
					Email
				</label>
					{validationErrors.email ? (<p>{validationErrors.email}</p>) : null}
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}

					/>
				</div>
					<div className='signupDiv'>
				<label>
					Username
				</label>
					{validationErrors.username ? (<p>{validationErrors.username}</p>) : null}

					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}

					/>
					</div>
				<div className='signupDiv'>
				<label>
          	First Name
			  </label>
		  {validationErrors.first_name? (<p>{validationErrors.first_name}</p>) : null}
          <input
          type='text'
          value={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
          />
				</div>
       <div className='signupDiv'>
        <label>
          Last Name
		  </label>
		  {validationErrors.last_name ? (<p>{validationErrors.last_name}</p>) : null}
          <input
          type='text'
          value={last_name}
          onChange={(e) => setlast_name(e.target.value)}
          />
	   </div>
		  <div className='signupDiv'>
				<label>
          City 
		  </label>
		  {validationErrors.city ? (<p>{validationErrors.city}</p>) : null}
          <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
		  </div>
		  <div className='signupDiv'>
        <label>
          Phone Number
		  </label>
		  {validationErrors.phone_number ? (<p>{validationErrors.phone_number}</p>) : null}
          <input
          type='text'
          value={phone_number}
          onChange={(e) => setphone_number(e.target.value)}
          />

		  </div>

		<div className='signupDiv'>
				<label >
					Password
					{validationErrors.password ? (<p>{validationErrors.password}</p>) : null}
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
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
