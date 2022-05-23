import { useCallback, useReducer } from "react";

class FormReducerActionTypes {
	static INPUT_CHANGE = "INPUT_CHANGE";
	static SET_DATA = "SET_DATA";
}

function formReducer(state, action) {
	switch (action.type) {
		case FormReducerActionTypes.INPUT_CHANGE:
			let formIsValid = true;
			for (const inputName in state.inputs) {
				if (state.inputs[inputName] === undefined) {
					continue;
				}
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
		case FormReducerActionTypes.SET_DATA:
			return {
				...state,
				inputs: action.formInputs,
				isValid: action.formIsValid,
			};
		default:
			console.warn(
				`Unimplemented action type passed to 'formReducer': ${action.type}`
			);
			return state;
	}
}

const useForm = (inputNames, isInitiallyValid = false) => {
	const [formState, formDispatch] = useReducer(formReducer, {
		inputs: {
			...inputNames.reduce((acc, inputName) => {
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

	const setFormData = useCallback(
		(formInputs, formIsValid) => {
			formDispatch({
				type: FormReducerActionTypes.SET_DATA,
				formInputs,
				formIsValid,
			});
		},
		[formDispatch]
	);

	return [formState, inputHandler, setFormData];
};

export default useForm;
