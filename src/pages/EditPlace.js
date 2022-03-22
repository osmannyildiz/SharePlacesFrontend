import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useForm from "../hooks/useForm";
import "../styles/form.css";
import { PLACES } from "../utils/dummyData";
import { Validators } from "../utils/validation";

export default function EditPlace() {
	const params = useParams();

	const [formState, inputHandler, setFormData] = useForm([
		"title",
		"description",
	]);

	const [place, setPlace] = useState(null);

	const { placeId } = params;
	useEffect(() => {
		setTimeout(() => {
			const place = PLACES.find((place) => place.id === parseInt(placeId));
			setPlace(place);
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
			console.log("hey");
		}, 3000);
	}, [placeId, setFormData]);

	function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		console.log(formState.inputs);
	}

	if (place) {
		return (
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
					ADD PLACE
				</Button>
			</form>
		);
	} else {
		return (
			<div className="center">
				<h2>Loading...</h2>
			</div>
		);
	}
}
