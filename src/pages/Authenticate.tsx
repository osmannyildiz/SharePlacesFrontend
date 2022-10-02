import { useContext, useState } from "react";
import Button from "../components/form/Button";
import FormInput from "../components/form/FormInput";
import ImagePicker from "../components/form/ImagePicker";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import { Validators } from "../utils/validation";
import "./Authenticate.scss";

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
					import.meta.env.PUBLIC_APP_BACKEND_API_URL + "/users/login",
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
					import.meta.env.PUBLIC_APP_BACKEND_API_URL + "/users/register",
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
			<form className="auth-form form form--panel" onSubmit={submitHandler}>
				<h2 className="auth-form__heading">
					{isLoginMode ? "Login" : "Register"}
				</h2>
				<hr />
				{!isLoginMode && (
					<FormInput
						type="text"
						name="name"
						label="Your Name"
						validations={[Validators.required()]}
						onInput={inputHandler}
					/>
				)}
				<FormInput
					type="email"
					name="email"
					label="E-mail"
					validations={[Validators.email()]}
					onInput={inputHandler}
				/>
				<FormInput
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
					className="auth-form__submit-btn mx-auto"
					disabled={!formState.isValid}
					style={{ marginBottom: "1rem" }}
				>
					{isLoginMode ? "LOGIN" : "REGISTER"}
				</Button>
				<Button
					type="button"
					inverse
					className="auth-form__switch-btn mx-auto"
					onClick={switchMode}
					style={{ marginTop: "1rem" }}
				>
					SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
				</Button>
			</form>
		</>
	);
}
