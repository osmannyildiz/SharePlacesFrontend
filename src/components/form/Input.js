import React, { useReducer } from "react";
import { validate, ValidationTypes } from "../../util/validation";
import "./Input.css";

class InputReducerActionTypes {
	static CHANGE = "CHANGE";
	static TOUCH = "TOUCH";
}

export default function Input(props) {
	function inputReducer(state, action) {
		switch (action.type) {
			case InputReducerActionTypes.CHANGE:
				return {
					...state,
					value: action.value,
					...validate(action.value, props.validators),
				};
			case InputReducerActionTypes.TOUCH:
				if (!state.isTouched) {
					return {
						...state,
						...validate(state.value, props.validators),
						isTouched: true,
					};
				} else {
					return state;
				}
			default:
				console.warn(
					`Unimplemented action type passed to 'inputReducer': ${action.type}`
				);
				return state;
		}
	}
	const [inputState, inputDispatch] = useReducer(inputReducer, {
		value: props.initialValue || "",
		isValid:
			props.initialValue ||
			props.validators.filter(
				(validator) => validator.type === ValidationTypes.REQUIRED
			).length === 0,
		errorText: "",
		isTouched: false,
	});

	function changeHandler(event) {
		inputDispatch({
			type: InputReducerActionTypes.CHANGE,
			value: event.target.value,
		});
	}

	function blurHandler(event) {
		inputDispatch({
			type: InputReducerActionTypes.TOUCH,
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
					onBlur={blurHandler}
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
					onBlur={blurHandler}
				/>
			);
	}

	return (
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			}`}
		>
			<label htmlFor={props.name}>{props.label}</label>
			{inputEl}
			{!inputState.isValid && inputState.isTouched && (
				<p>{inputState.errorText}</p>
			)}
		</div>
	);
}
