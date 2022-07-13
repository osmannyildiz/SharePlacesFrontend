import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button(props) {
	const className = `
		button
		button--${props.size || "default"}
		${props.inverse && "button--inverse"}
		${props.danger && "button--danger"}
		${props.className || ""}
	`;

	if (props.href) {
		return (
			<a href={props.href} className={className}>
				{props.children}
			</a>
		);
	}

	if (props.to) {
		return (
			<Link to={props.to} exact={props.exact} className={className}>
				{props.children}
			</Link>
		);
	}

	return (
		<button
			type={props.type}
			className={className}
			style={props.style}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
