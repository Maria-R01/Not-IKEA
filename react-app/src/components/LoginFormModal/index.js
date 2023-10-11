import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
        history.push('/home')
    }
  };


  const demoUser = async () => {
    // const demoUserCredential = 'bobbie@aa.io'
    // const demoUserPassword = 'password'
    // return await dispatch(login(demoUserCredential, demoUserPassword))
    //   .then(closeModal)
    //   .then(history.push('/'))
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if(data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   })
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="errors">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        {/* <div className="demo-user"> */}
          <button onClick={demoUser} >Demo User</button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default LoginFormModal;
