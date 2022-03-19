import React from "react";
import "./Input.css";

export default function Input(props) {
	let inputEl;
	switch (props.as) {
		case "textarea":
			inputEl = (
				<textarea name={props.name} id={props.name} rows={props.rows || 3} />
			);
			break;
		default:
			inputEl = (
				<input
					type={props.type}
					name={props.name}
					id={props.name}
					placeholder={props.placeholder || ""}
				/>
			);
	}

	return (
		<div className={`form-control`}>
			<label htmlFor={props.name}>{props.label}</label>
			{inputEl}
		</div>
	);
}
