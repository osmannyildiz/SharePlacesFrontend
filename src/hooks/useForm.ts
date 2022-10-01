import { useCallback, useReducer } from "react";
import FileInputValue from "../models/FileInputValue";

interface FormReducerState {
	inputs: FormReducerStateInputs;
	isValid: boolean;
}

interface FormReducerStateInputs {
	[inputName: string]: FormReducerStateInput;
}

interface FormReducerStateInput {
	value: FormReducerStateInputValue;
	isValid: boolean;
}

type FormReducerStateInputValue = string | number | FileInputValue;

interface FormReducerAction {
	type: FormReducerActionType;
	payload?: any;
}

enum FormReducerActionType {
	INPUT_CHANGE = "inputChange",
	SET_DATA = "setData",
}

const formReducer: React.Reducer<FormReducerState, FormReducerAction> = (
	state,
	action
) => {
	switch (action.type) {
		case FormReducerActionType.INPUT_CHANGE:
			let formIsValid = true;
			for (const inputName in state.inputs) {
				if (state.inputs[inputName] === undefined) {
					continue;
				}
				if (inputName === action.payload?.inputName) {
					formIsValid = formIsValid && action.payload?.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputName].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.payload?.inputName]: {
						value: action.payload?.value,
						isValid: action.payload?.isValid,
					},
				},
				isValid: formIsValid,
			};
		case FormReducerActionType.SET_DATA:
			return {
				...state,
				inputs: action.payload?.formInputs,
				isValid: action.payload?.formIsValid,
			};
		default:
			throw new Error(
				`Unimplemented action type passed to 'formReducer': ${action.type}`
			);
	}
};

const useForm = (inputNames: string[], isInitiallyValid: boolean = false) => {
	const [formState, formDispatch] = useReducer(formReducer, {
		inputs: {
			...inputNames.reduce((acc: FormReducerStateInputs, inputName) => {
				acc[inputName] = {
					value: "",
					isValid: false,
				};
				return acc;
			}, {}),
		},
		isValid: isInitiallyValid,
	});

	const inputHandler = useCallback(
		(name: string, value: FormReducerStateInputValue, isValid: boolean) => {
			formDispatch({
				type: FormReducerActionType.INPUT_CHANGE,
				payload: {
					inputName: name,
					value,
					isValid,
				},
			});
		},
		[formDispatch]
	);

	const setFormData = useCallback(
		(formInputs: any, formIsValid: boolean) => {
			formDispatch({
				type: FormReducerActionType.SET_DATA,
				payload: {
					formInputs,
					formIsValid,
				},
			});
		},
		[formDispatch]
	);

	return { formState, inputHandler, setFormData };
};

export default useForm;
