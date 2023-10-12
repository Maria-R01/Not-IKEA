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
	const { closeModal } = useModal();

	const validEmail = (email) => {
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return emailRegex.test(email);
	};

	const validatePassword = (password) => {
	return password.length >= 6;
	};

	const validateUsername = (username) => {
	return username.length >= 6;
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validEmail(email)) {
			setErrors([
			"Please enter a valid email address."
			]);
			return;
		}

		if (!validateUsername(username)) {
			setErrors(["Username must be at least 6 characters long."]);
			return;
		}
		if (!validatePassword(password)) {
			setErrors(["Password must be at least 6 characters long."]);
			return;
		}
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
		<div className="signup-modal">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
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
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
				<label>
					Confirm Password:
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;