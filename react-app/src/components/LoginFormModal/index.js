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
    return dispatch(login({ email, password}))
    .then(closeModal)
  }


  return (
    <>
      <form className='loginForm' onSubmit={handleSubmit}>
      <h1 className='loginFormH'>Log In</h1>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
          <div className='loginDiv'>
        <label>
          Email
          </label>
          <input
          className='cardButt'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          </label>
          <input
          className='cardButt'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        <div className='loginButtons'>
        {errors.password && <p>{errors.password}</p>}
        <button className='cardButt' type="submit" disabled={!email || !password}>Log In</button>
        <button className='cardButt' onClick={autoLogin}>Login in as Demo User</button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
