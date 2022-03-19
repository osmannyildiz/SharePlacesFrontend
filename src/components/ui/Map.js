import React from "react";
import "./Map.css";

export default function Map(props) {
	return (
		<div className="map">
			<span>lat: {props.center.lat}</span>
			<span>lng: {props.center.lng}</span>
		</div>
	);
}
