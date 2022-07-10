import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Card from "../components/ui/Card";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import "../styles/form.css";
import { Validators } from "../utils/validation";

export default function EditPlace() {
	const [place, setPlace] = useState(null);
	const authContext = useContext(AuthContext);
	const { placeId } = useParams();
	const history = useHistory();
	const [sendRequest, isLoading, error, clearError] = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm([
		"title",
		"description",
	]);

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest(
					`http://localhost:5000/api/places/${placeId}`
				);
				const place = respData.data;
				setPlace(place);
				if (place) {
					setFormData(
						{
							title: {
								value: place.title,
								isValid: true,
							},
							description: {
								value: place.description,
								isValid: true,
							},
						},
						true
					);
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, [sendRequest, placeId, setFormData]);

	async function submitHandler(event) {
		event.preventDefault();
		try {
			await sendRequest(
				`http://localhost:5000/api/places/${placeId}`,
				"PATCH",
				{
					"Content-Type": "application/json",
				},
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				})
			);
			history.push(`/users/${authContext.userId}/places`);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onCancel={clearError} />
			{isLoading && (
				<div className="center">
					<Spinner />
				</div>
			)}
			{!isLoading && !place && (
				<div className="center">
					<Card>
						<h2>This place doesn't exist!</h2>
					</Card>
				</div>
			)}
			{place && (
				<form className="form place-edit-form" onSubmit={submitHandler}>
					<Input
						type="text"
						name="title"
						label="Title"
						validators={[Validators.required()]}
						onInput={inputHandler}
						initialValue={place.title}
					/>
					<Input
						as="textarea"
						name="description"
						label="Description"
						validators={[Validators.minLength(5)]}
						onInput={inputHandler}
						initialValue={place.description}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</React.Fragment>
	);
}
