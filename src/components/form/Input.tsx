import { useEffect, useReducer } from "react";
import cn from "../../utils/classNamesHelper";
import { runValidations, Validation } from "../../utils/validation";
import "./Input.css";

interface InputReducerState {
	value: string | number;
	isValid: boolean;
	errorText: string;
	isTouched: boolean;
}

interface InputReducerAction {
	type: InputReducerActionType;
	payload?: string | number;
}

enum InputReducerActionType {
	INIT = "INIT",
	CHANGE = "CHANGE",
	TOUCH = "TOUCH",
}

interface Props {
	className?: string;
	label?: string;
	name: string;
	as?: string;
	type?: string;
	placeholder?: string;
	rows?: number;
	initialValue?: string | number;
	validations: Validation[];
	onInput: (name: string, value: string | number, isValid: boolean) => void;
}

export default function Input(props: Props) {
	const inputReducer: React.Reducer<InputReducerState, InputReducerAction> = (
		state,
		action
	) => {
		switch (action.type) {
			case InputReducerActionType.INIT:
				return {
					...state,
					...runValidations(state.value, props.validations),
				};
			case InputReducerActionType.CHANGE:
				return {
					...state,
					value: action.payload!,
					...runValidations(action.payload!, props.validations),
				};
			case InputReducerActionType.TOUCH:
				if (!state.isTouched) {
					return {
						...state,
						...runValidations(state.value, props.validations),
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
	};
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
			type: InputReducerActionType.INIT,
		});
		onInput(name, value, isValid);
	}, []);

	const changeHandler: React.ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		inputDispatch({
			type: InputReducerActionType.CHANGE,
			payload: event.target.value,
		});
	};

	const blurHandler: React.FocusEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		inputDispatch({
			type: InputReducerActionType.TOUCH,
		});
	};

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
			className={cn(
				"form-control",
				!inputState.isValid && inputState.isTouched && "form-control--invalid"
			)}
		>
			<label htmlFor={props.name}>{props.label}</label>
			{inputEl}
			{!inputState.isValid && inputState.isTouched && (
				<p>{inputState.errorText}</p>
			)}
		</div>
	);
}
