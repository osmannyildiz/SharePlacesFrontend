import React from "react";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useForm from "../hooks/useForm";
import "../styles/form.css";
import { Validators } from "../utils/validation";

export default function AddPlace() {
	const [formState, inputHandler] = useForm([
		"title",
		"description",
		"address",
	]);

	function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		console.log(formState.inputs);
	}

	return (
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
	);
}
