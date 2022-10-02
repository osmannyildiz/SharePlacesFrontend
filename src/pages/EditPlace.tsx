import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/form/Button";
import FormInput from "../components/form/FormInput";
import Card from "../components/ui/Card";
import ErrorModal from "../components/ui/ErrorModal";
import Spinner from "../components/ui/Spinner";
import AuthContext from "../contexts/authContext";
import useForm from "../hooks/useForm";
import useHttpClient from "../hooks/useHttpClient";
import Place from "../models/Place";
import "../styles/form.scss";
import { Validators } from "../utils/validation";

export default function EditPlace() {
	const [place, setPlace] = useState<Place | null>(null);
	const authContext = useContext(AuthContext);
	const { placeId } = useParams();
	const navigate = useNavigate();
	const { formState, inputHandler, setFormData } = useForm([
		"title",
		"description",
	]);
	const { sendRequest, isLoading, error, clearError } = useHttpClient();

	useEffect(() => {
		(async () => {
			try {
				const respData = await sendRequest(
					import.meta.env.PUBLIC_APP_BACKEND_API_URL + `/places/${placeId}`
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

	const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
		event
	) => {
		event.preventDefault();
		try {
			await sendRequest(
				import.meta.env.PUBLIC_APP_BACKEND_API_URL + `/places/${placeId}`,
				"PATCH",
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + authContext.token,
				},
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
				})
			);
			navigate(`/users/${authContext.userId}/places`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
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
				<form
					className="place-edit-form form form--panel"
					onSubmit={submitHandler}
				>
					<FormInput
						type="text"
						name="title"
						label="Title"
						validations={[Validators.required()]}
						onInput={inputHandler}
						initialValue={place.title}
					/>
					<FormInput
						as="textarea"
						name="description"
						label="Description"
						validations={[Validators.minLength(5)]}
						onInput={inputHandler}
						initialValue={place.description}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						UPDATE PLACE
					</Button>
				</form>
			)}
		</>
	);
}
