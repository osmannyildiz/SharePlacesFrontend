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

	async function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		if (isLoginMode) {
		} else {
			try {
				const resp = await fetch("http://localhost:5000/api/users/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: formState.inputs.name.value,
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					}),
				});
				const respData = await resp.json();
				console.log(respData);

				// TODO Login only if backend approves
				if (!respData.ok) {
				}

				authContext.login();
			} catch (err) {
				console.error(err);
			}
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
