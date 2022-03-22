export class ValidationTypes {
	static REQUIRED = "REQUIRED";
	static MINLENGTH = "MINLENGTH";
	static MAXLENGTH = "MAXLENGTH";
	static MIN = "MIN";
	static MAX = "MAX";
	static EMAIL = "EMAIL";
	// static FILE = "FILE";
}

export class Validators {
	static required = () => ({ type: ValidationTypes.REQUIRED });
	static minLength = (val) => ({ type: ValidationTypes.MINLENGTH, val: val });
	static maxLength = (val) => ({ type: ValidationTypes.MAXLENGTH, val: val });
	static min = (val) => ({ type: ValidationTypes.MIN, val: val });
	static max = (val) => ({ type: ValidationTypes.MAX, val: val });
	static email = () => ({ type: ValidationTypes.EMAIL });
	// static file = () => ({ type: ValidationTypes.FILE });
}

export function validate(value, validators) {
	let isValid = true;
	let errorText = "";

	for (const validator of validators) {
		switch (validator.type) {
			case ValidationTypes.REQUIRED:
				isValid = value.trim().length > 0;
				if (!isValid) errorText = "This field is required.";
				break;

			case ValidationTypes.MINLENGTH:
				isValid = value.trim().length >= validator.val;
				if (!isValid)
					errorText = `This field must be at least ${validator.val} characters long.`;
				break;

			case ValidationTypes.MAXLENGTH:
				isValid = value.trim().length <= validator.val;
				if (!isValid)
					errorText = `This field must be maximum ${validator.val} characters long.`;
				break;

			case ValidationTypes.MIN:
				isValid = +value >= validator.val;
				if (!isValid)
					errorText = `This field must be greater than or equal to ${validator.val}.`;
				break;

			case ValidationTypes.MAX:
				isValid = +value <= validator.val;
				if (!isValid)
					errorText = `This field must be less than or equal to ${validator.val}.`;
				break;

			case ValidationTypes.EMAIL:
				isValid = /^\S+@\S+\.\S+$/.test(value);
				if (!isValid) errorText = "This field must be a valid e-mail address.";
				break;

			// case ValidationTypes.FILE:
			// 	break;

			default:
				console.warn(
					`Unimplemented validator type passed to 'validate': ${validator.type}`
				);
		}

		if (!isValid) break;
	}

	return { isValid, errorText };
}
