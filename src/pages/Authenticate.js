import React, { useContext, useState } from "react";
import Button from "../components/form/Button";
import ImagePicker from "../components/form/ImagePicker";
import Input from "../components/form/Input";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import { Validators } from "../utils/validation";
import "./Authenticate.css";

export default function Authenticate() {
	const authContext = useContext(AuthContext);

	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(["email", "password"]);
	const [sendRequest, isLoading, error, clearError] = useHttpClient();

	const switchMode = () => {
		if (!isLoginMode) {
			// Switching to login mode
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					image: undefined,
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
					image: {
						value: null,
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
			try {
				const respData = await sendRequest(
					"http://localhost:5000/api/users/login",
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				);
				authContext.login(respData.data.id);
			} catch (err) {
				console.error(err);
			}
		} else {
			try {
				const formData = new FormData();
				formData.append("name", formState.inputs.name.value);
				formData.append("email", formState.inputs.email.value);
				formData.append("password", formState.inputs.password.value);
				formData.append("image", formState.inputs.image.value);
				const respData = await sendRequest(
					"http://localhost:5000/api/users/register",
					"POST",
					undefined,
					formData
				);
				authContext.login(respData.data.id);
			} catch (err) {
				console.error(err);
			}
		}
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && <Spinner asOverlay />}
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
				{!isLoginMode && (
					<ImagePicker name="image" center onInput={inputHandler} />
				)}
				<Button
					type="submit"
					disabled={!formState.isValid}
					style={{ marginTop: "1.5rem" }}
				>
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
