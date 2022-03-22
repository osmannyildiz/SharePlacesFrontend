import React from "react";
import { useParams } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useForm from "../hooks/useForm";
import "../styles/form.css";
import { PLACES } from "../utils/dummyData";
import { Validators } from "../utils/validation";

export default function EditPlace() {
	const params = useParams();

	const [formState, inputHandler] = useForm(["title", "description"]);

	const place = PLACES.find((place) => place.id === parseInt(params.placeId));
	if (!place) {
		// TODO Handle this better
		return (
			<div className="center">
				<h2>This place doesn't exist!</h2>
			</div>
		);
	}

	function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		console.log(formState.inputs);
	}

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
}
