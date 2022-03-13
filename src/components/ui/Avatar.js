import React from "react";
import "./Avatar.css";

export default function Avatar(props) {
	return (
		<div className={`avatar ${props.className}`} style={props.style}>
			<img
				src={props.src}
				alt={props.alt}
				style={{ width: props.size, height: props.size }}
			/>
		</div>
	);
}
