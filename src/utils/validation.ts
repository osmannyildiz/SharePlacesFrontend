export enum ValidationType {
	REQUIRED = "required",
	MIN_LENGTH = "minLength",
	MAX_LENGTH = "maxLength",
	MIN = "min",
	MAX = "max",
	EMAIL = "email",
	// FILE = "FILE",
}

export interface Validation {
	type: ValidationType;
	option?: number;
}

type Validator = (option?: number) => Validation;

export class Validators {
	static required: Validator = () => ({ type: ValidationType.REQUIRED });
	static minLength: Validator = (minLength) => ({
		type: ValidationType.MIN_LENGTH,
		option: minLength,
	});
	static maxLength: Validator = (maxLength) => ({
		type: ValidationType.MAX_LENGTH,
		option: maxLength,
	});
	static min: Validator = (min) => ({ type: ValidationType.MIN, option: min });
	static max: Validator = (max) => ({ type: ValidationType.MAX, option: max });
	static email: Validator = () => ({ type: ValidationType.EMAIL });
	// static file: Validator = () => ({ type: ValidationType.FILE });
}

interface ValidationResult {
	isValid: boolean;
	errorText: string;
}

export function runValidations(
	value: string | number,
	validations: Validation[]
): ValidationResult {
	let isValid = true;
	let errorText = "";

	for (const validation of validations) {
		switch (validation.type) {
			case ValidationType.REQUIRED:
				isValid = (value as string).trim().length > 0;
				if (!isValid) errorText = "This field is required.";
				break;

			case ValidationType.MIN_LENGTH:
				isValid = (value as string).trim().length >= validation.option!;
				if (!isValid)
					errorText = `This field must be at least ${validation.option} characters long.`;
				break;

			case ValidationType.MAX_LENGTH:
				isValid = (value as string).trim().length <= validation.option!;
				if (!isValid)
					errorText = `This field must be maximum ${validation.option} characters long.`;
				break;

			case ValidationType.MIN:
				isValid = +value >= validation.option!;
				if (!isValid)
					errorText = `This field must be greater than or equal to ${validation.option}.`;
				break;

			case ValidationType.MAX:
				isValid = +value <= validation.option!;
				if (!isValid)
					errorText = `This field must be less than or equal to ${validation.option}.`;
				break;

			case ValidationType.EMAIL:
				isValid = /^\S+@\S+\.\S+$/.test(value as string);
				if (!isValid) errorText = "This field must be a valid e-mail address.";
				break;

			// case ValidationType.FILE:
			// 	break;

			default:
				throw new Error(
					`Unimplemented validator type passed to 'validate': ${validation.type}`
				);
		}

		if (!isValid) break;
	}

	return { isValid, errorText };
}
