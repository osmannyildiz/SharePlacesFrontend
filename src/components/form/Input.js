import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/validation";
import "./Input.css";

class InputReducerActionTypes {
	static INIT = "INIT";
	static CHANGE = "CHANGE";
	static TOUCH = "TOUCH";
}

export default function Input(props) {
	function inputReducer(state, action) {
		switch (action.type) {
			case InputReducerActionTypes.INIT:
				return {
					...state,
					...validate(state.value, props.validators),
				};
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
		isValid: false,
		errorText: "",
		isTouched: false,
	});

	const { onInput, name } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(name, value, isValid);
	}, [onInput, name, value, isValid]);

	useEffect(() => {
		inputDispatch({
			type: InputReducerActionTypes.INIT,
		});
		onInput(name, value, isValid);
		// eslint-disable-next-line
	}, []);

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
