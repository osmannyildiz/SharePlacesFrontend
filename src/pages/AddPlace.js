import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import "../styles/form.css";
import { Validators } from "../utils/validation";

export default function AddPlace() {
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const [formState, inputHandler] = useForm([
		"title",
		"description",
		"address",
	]);
	const [sendRequest, isLoading, error, clearError] = useHttpClient();

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await sendRequest(
				"http://localhost:5000/api/places",
				"POST",
				{
					"Content-Type": "application/json",
				},
				JSON.stringify({
					userId: authContext.userId,
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					address: formState.inputs.address.value,
				})
			);
			history.push("/");
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && <Spinner asOverlay />}
			<form className="form place-add-form" onSubmit={submitHandler}>
				<Input
					type="text"
					name="title"
					label="Title"
					validators={[Validators.required()]}
					onInput={inputHandler}
				/>
				<Input
					as="textarea"
					name="description"
					label="Description"
					validators={[Validators.minLength(5)]}
					onInput={inputHandler}
				/>
				<Input
					type="text"
					name="address"
					label="Address"
					validators={[Validators.required()]}
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</React.Fragment>
	);
}
