import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const autoLogin = e => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login({ email, password }))
      .then(closeModal)
  }


  return (
    <>
      <form className='signupForm' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {errors.map((error, idx) => (
          <p className="error" key={idx}>{error}</p>
        ))}
        <div className='signupDiv'>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>
        {errors.email && <p>{errors.email}</p>}
        <div className='signupDiv'>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='loginButtons'>
          {errors.password && <p>{errors.password}</p>}
          <button type="submit" disabled={!email || !password}>Log In</button>
          <button onClick={autoLogin}>Login in as Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
