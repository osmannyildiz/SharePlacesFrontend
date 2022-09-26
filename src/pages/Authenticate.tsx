import { useContext, useState } from "react";
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
	const { formState, inputHandler, setFormData } = useForm([
		"email",
		"password",
	]);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

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

	const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		if (isLoginMode) {
			try {
				const respData = await sendRequest(
					import.meta.env.REACT_APP_BACKEND_API_URL + "/users/login",
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
					})
				);
				authContext.login(respData.data.userId, respData.data.token);
			} catch (err) {
				console.error(err);
			}
		} else {
			const formData = new FormData();
			formData.append("name", formState.inputs.name.value as string);
			formData.append("email", formState.inputs.email.value as string);
			formData.append("password", formState.inputs.password.value as string);
			formData.append("image", formState.inputs.image.value as Blob);
			try {
				const respData = await sendRequest(
					import.meta.env.REACT_APP_BACKEND_API_URL + "/users/register",
					"POST",
					undefined,
					formData
				);
				authContext.login(respData.data.userId, respData.data.token);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && <Spinner asOverlay />}
			<form className="auth-form form" onSubmit={submitHandler}>
				<h2 className="auth-form__heading">
					{isLoginMode ? "Login" : "Register"}
				</h2>
				<hr />
				{!isLoginMode && (
					<Input
						type="text"
						name="name"
						label="Your Name"
						validations={[Validators.required()]}
						onInput={inputHandler}
					/>
				)}
				<Input
					type="email"
					name="email"
					label="E-mail"
					validations={[Validators.email()]}
					onInput={inputHandler}
				/>
				<Input
					type="password"
					name="password"
					label="Password"
					validations={[Validators.minLength(6)]}
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
					className="auth-form__switch-btn"
					onClick={switchMode}
				>
					SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
				</Button>
			</form>
		</>
	);
}
