import React, { useContext, useState } from "react";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import { Validators } from "../utils/validation";
import "./Authenticate.css";

export default function Authenticate() {
	const authContext = useContext(AuthContext);

	const [formState, inputHandler, setFormData] = useForm(["email", "password"]);

	const [isLoginMode, setIsLoginMode] = useState(true);

	const switchMode = () => {
		if (!isLoginMode) {
			// Switching to login mode
			setFormData(
				{
					...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			// Switching to register mode
			// (Actually it still works if we omit this whole else block)
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((isLoginMode) => !isLoginMode);
	};

	function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		console.log(formState.inputs);
		// TODO Login only if backend approves
		if (true) {
			authContext.login();
		}
	}

	return (
		<React.Fragment>
			<form className="form auth-form" onSubmit={submitHandler}>
				<h2>{isLoginMode ? "Login" : "Register"}</h2>
				<hr />
				{!isLoginMode && (
					<Input
						type="text"
						name="name"
						label="Your Name"
						validators={[Validators.required()]}
						onInput={inputHandler}
					/>
				)}
				<Input
					type="email"
					name="email"
					label="E-mail"
					validators={[Validators.email()]}
					onInput={inputHandler}
				/>
				<Input
					type="password"
					name="password"
					label="Password"
					validators={[Validators.minLength(6)]}
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{isLoginMode ? "LOGIN" : "REGISTER"}
				</Button>
				<br />
				<Button
					type="button"
					inverse
					className="switch-btn"
					onClick={switchMode}
				>
					SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
				</Button>
			</form>
		</React.Fragment>
	);
}
