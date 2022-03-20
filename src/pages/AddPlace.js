import React from "react";
import Input from "../components/form/Input";
import { Validators } from "../util/validation";
import "./AddPlace.css";

export default function AddPlace() {
	return (
		<form className="place-add-form">
			<Input
				type="text"
				name="title"
				label="Title"
				validators={[Validators.required()]}
				onInput={null}
			/>
		</form>
	);
}
