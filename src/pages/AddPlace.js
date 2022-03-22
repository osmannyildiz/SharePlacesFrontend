import React, { useCallback, useReducer } from "react";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import { Validators } from "../util/validation";
import "./common/form.css";

class FormReducerActionTypes {
	static INPUT_CHANGE = "INPUT_CHANGE";
}

export default function AddPlace() {
	function formReducer(state, action) {
		switch (action.type) {
			case FormReducerActionTypes.INPUT_CHANGE:
				let formIsValid = true;
				for (const inputName in state.inputs) {
					if (inputName === action.inputName) {
						formIsValid = formIsValid && action.isValid;
					} else {
						formIsValid = formIsValid && state.inputs[inputName].isValid;
					}
				}
				return {
					...state,
					inputs: {
						...state.inputs,
						[action.inputName]: {
							value: action.value,
							isValid: action.isValid,
						},
					},
					isValid: formIsValid,
				};
			default:
				console.warn(
					`Unimplemented action type passed to 'formReducer': ${action.type}`
				);
				return state;
		}
	}
	const [formState, formDispatch] = useReducer(formReducer, {
		inputs: {
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		isValid: false,
	});

	const inputHandler = useCallback(
		(name, value, isValid) => {
			formDispatch({
				type: FormReducerActionTypes.INPUT_CHANGE,
				inputName: name,
				value,
				isValid,
			});
		},
		[formDispatch]
	);

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
				validators={[Validators.minLength(5)]}
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				ADD PLACE
			</Button>
		</form>
	);
}
