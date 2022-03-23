import React from "react";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useForm from "../hooks/useForm";
import { Validators } from "../utils/validation";
import "./Authenticate.css";

export default function Authenticate() {
	const [formState, inputHandler] = useForm(["email", "password"]);

	function submitHandler(event) {
		event.preventDefault();
		// TODO Send form data to backend
		console.log(formState.inputs);
	}

	return (
		<form className="form auth-form" onSubmit={submitHandler}>
			<h2>Login</h2>
			<hr />
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
			<Button type="submit" disabled={!formState.isValid}>
				LOGIN
			</Button>
		</form>
	);
}
