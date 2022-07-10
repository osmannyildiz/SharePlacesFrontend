import React from "react";
import "./Spinner.css";

export default function Spinner(props) {
	return (
		<div className={`${props.asOverlay && "spinner__overlay"}`}>
			<div className="spinner-dual-ring"></div>
		</div>
	);
}
