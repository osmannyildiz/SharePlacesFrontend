import React, { useReducer } from "react";
import "./Input.css";

function inputReducer(state, action) {
	switch (action.type) {
		case InputReducerActionTypes.CHANGE:
			return {
				...state,
				value: action.value,
				isValid: true,
				errorText: "",
			};
		default:
			console.warn("Unimplemented action type passed to inputReducer!");
			return state;
	}
}

class InputReducerActionTypes {
	static CHANGE = "CHANGE";
}

export default function Input(props) {
	const [inputState, inputDispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isValid: true,
		errorText: "",
	});

	function changeHandler(event) {
		inputDispatch({
			type: InputReducerActionTypes.CHANGE,
			value: event.target.value,
		});
	}

	let inputEl;
	switch (props.as) {
		case "textarea":
			inputEl = (
				<textarea
					name={props.name}
					id={props.name}
					rows={props.rows || 3}
					value={inputState.value}
					onChange={changeHandler}
				/>
			);
			break;
		default:
			inputEl = (
				<input
					type={props.type}
					name={props.name}
					id={props.name}
					placeholder={props.placeholder || ""}
					value={inputState.value}
					onChange={changeHandler}
				/>
			);
	}

	return (
		<div
			className={`form-control ${
				!inputState.isValid && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.name}>{props.label}</label>
			{inputEl}
			{!inputState.isValid && <p>{inputState.errorText}</p>}
		</div>
	);
}
